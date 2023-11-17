import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { WorthBankConfirmationService } from '@worthbank/services/confirmation';
import { Client, Country } from 'app/modules/admin/clients/clients.types';
import { ClientsListComponent } from 'app/modules/admin/clients/list/list.component';
import { ClientsService } from 'app/modules/admin/clients/clients.service';
import { ClientCommunicationService } from '../shared.service';

@Component({
    selector: 'clients-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsDetailsComponent implements OnInit, OnDestroy {
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

    editMode: boolean = false;
    client: Client;
    clientForm: UntypedFormGroup;
    clients: Client[];
    countries: Country[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _clientsListComponent: ClientsListComponent,
        private _clientsService: ClientsService,
        private _formBuilder: UntypedFormBuilder,
        private _worthbankConfirmationService: WorthBankConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _eR: ElementRef,
        private _viewContainerRef: ViewContainerRef,
        private _clientCommunicationService: ClientCommunicationService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._clientsListComponent.matDrawer.open();

        // Create the client form
        this.clientForm = this._formBuilder.group({
            id: [''],
            avatar: [null],
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phoneNumbers: this._formBuilder.array([]),
            title: [''],
            company: [''],
            birthday: [null],
            address: [null],
            notes: [null],
        });

        // Get the clients
        this._clientsService.clients$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((clients: Client[]) => {
                this.clients = clients;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the client
        this._clientsService.client$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((client: Client) => {

                // Open the drawer in case it is closed
                this._clientsListComponent.matDrawer.open();

                // Get the client
                this.client = client;

                // Clear the emails and phoneNumbers form arrays
                (this.clientForm.get('phoneNumbers') as UntypedFormArray).clear();

                // Patch values to the form
                this.clientForm.patchValue(client);

                // Setup the phone numbers form array
                const phoneNumbersFormGroups = [];

                if (client.phoneNumbers.length > 0) {
                    // Iterate through them
                    client.phoneNumbers.forEach((phoneNumber) => {

                        // Create an email form group
                        phoneNumbersFormGroups.push(
                            this._formBuilder.group({
                                country: [phoneNumber.country],
                                phoneNumber: [phoneNumber.phoneNumber]
                            })
                        );
                    });
                }
                else {
                    // Create a phone number form group
                    phoneNumbersFormGroups.push(
                        this._formBuilder.group({
                            country: ['pe'],
                            phoneNumber: [''],
                        })
                    );
                }

                // Add the phone numbers form groups to the phone numbers form array
                phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
                    (this.clientForm.get('phoneNumbers') as UntypedFormArray).push(phoneNumbersFormGroup);
                });

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the country telephone codes
        this._clientsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                this.countries = codes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._clientsListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        }
        else {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the client
     */
    updateClient(): void {
        // Get the client object
        const client = this.clientForm.getRawValue();

        // Go through the client object and clear empty values
       // client.email = client.email.filter(email => email);

        client.phoneNumbers = client.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

        // Update the client on the server
        this._clientsService.updateClient(client.id, client).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the client
     */
    deleteClient(): void {
        console.log(this.editMode) // AQUI BUSCO QUE VALOR TIENE EDITMODE Y SALE FALSE A PESAR QUE EN EL ON INIT SALGA TRUE
        // Open the confirmation dialog
        const confirmation = this._worthbankConfirmationService.open({
            title: 'Eliminar cliente',
            message: '¿Está seguro de que desea eliminar este cliente? ¡Esta acción no se puede deshacer!',
            actions: {
                confirm: {
                    label: 'Eliminar'
                },
                cancel: {
                    label: 'Cancelar'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the current client's id
                const id = this.client.id;

                // Get the next/previous client's id
                const currentClientIndex = this.clients.findIndex(item => item.id === id);
                const nextClientIndex = currentClientIndex + ((currentClientIndex === (this.clients.length - 1)) ? -1 : 1);
                const nextClientId = (this.clients.length === 1 && this.clients[0].id === id) ? null : this.clients[nextClientIndex].id;

                // Delete the client
                this._clientsService.deleteClient(id)
                    .subscribe((isDeleted) => {

                        // Return if the client wasn't deleted...
                        if (!isDeleted) {
                            return;
                        }

                        // Navigate to the next client if available
                        if (nextClientId) {
                            this._router.navigate(['../', nextClientId], { relativeTo: this._activatedRoute });
                        }
                        // Otherwise, navigate to the parent
                        else {
                            this._router.navigate(['../'], { relativeTo: this._activatedRoute });
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        // Upload the avatar
        this._clientsService.uploadAvatar(this.client.id, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {
        // Get the form control for 'avatar'
        const avatarFormControl = this.clientForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the client
        this.client.avatar = null;
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeEmailField(index: number): void {
        // Get form array for emails
        // const emailsFormArray = this.clientForm.get('email') as UntypedFormArray;

        // Remove the email field
        // emailsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country: ['pe'],
            phoneNumber: [''],
            label: ['']
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.clientForm.get('phoneNumbers') as UntypedFormArray).push(phoneNumberFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.clientForm.get('phoneNumbers') as UntypedFormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    getCountryByIso(iso: string): Country {
        return this.countries.find(country => country.iso === iso);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
