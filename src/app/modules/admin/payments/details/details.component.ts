import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsListComponent } from '../list/list.component';
import { WorthBankConfirmationService } from '@worthbank/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, takeUntil } from 'rxjs';
import { Client } from '../../clients/clients.types';
import { ClientsService } from '../../clients/clients.service';
import { WorthBankAlertService } from '@worthbank/components/alert';
import { CatalogService } from '../../catalog/catalog.service';
import { Brand, Car } from '../../catalog/catalog.types';

@Component({
    selector: 'payments-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsDetailsComponent implements OnInit, OnDestroy{

    paymentsPlanCount: number = 0;
    paymentForm: UntypedFormGroup;
    clients: Client[];
    cars: Car[];
    brands: Brand[];
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
   
    /**
     * Constructor
     */
        constructor(
            private _activatedRoute: ActivatedRoute,
            private _changeDetectorRef: ChangeDetectorRef,
            private _paymentsListComponent: PaymentsListComponent,
            private _formBuilder: UntypedFormBuilder,
            private _clientsService: ClientsService,
            private _catalogService: CatalogService,
            private _worthbankConfirmationService: WorthBankConfirmationService,
            private _renderer2: Renderer2,
            private _router: Router,
            private _worthBankAlertService: WorthBankAlertService,
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
        this._paymentsListComponent.matDrawer.open();

        // Create the payment form
        this.paymentForm = this._formBuilder.group({
            id: [''],
            cliente: ['', [Validators.required]],
            vehiculo: ['', [Validators.required]],
            moneda: ['', [Validators.required]],
            tipoCambio: [{value:'3.21', disabled: true}, [Validators.required]],
            porcentajeCuotaInicial: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
            cuotaInicial: [{value:'', disabled: true}, [Validators.required]],
            montoPrestamo: [{value:'', disabled: true}, [Validators.required]],
            porcentajeCuotaFinal: ['', [Validators.required]],
            precioVenta: [{value:'', disabled: true}, [Validators.required]],
            porcentajeSeguroVehicular: ['', [Validators.required]],
            costosIniciales: [{value:'', disabled: true}, [Validators.required]],
            cuotaFinal: [{value:'', disabled: true}, [Validators.required]],
            porcentajeFinancEnCuotas: ['', [Validators.required]],
            financEnCuotas: [{value:'', disabled: true}, [Validators.required]],
            tipoTasa: ['', [Validators.required]],
            tasa: ['', [Validators.required]],
            plan: ['', [Validators.required]],
            seguroDesgravamen: ['', [Validators.required]],
            tipoPeriodoGracia: ['', [Validators.required]],
            periodosGracia: ['', [Validators.required]],
        });

        // Get the clients
        this._clientsService.clients$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((clients: Client[]) => {
                this.clients = clients;
            });

        // Get the brands
        this._catalogService.brands$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((brands: Brand[]) => {
                this.brands = brands;
            });  

        // Get the cars
        this._catalogService.cars$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cars: Car[]) => {
                this.cars = cars;
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
    // @ WorthBank Components
    // -----------------------------------------------------------------------------------------------------

    /**
     * Dismiss the alert via the service
     *
     * @param name
     */
    dismiss(name: string): void
    {
        this._worthBankAlertService.dismiss(name);
    }

    /**
     * Show the alert via the service
     *
     * @param name
     */
    show(name: string): void
    {
        this._worthBankAlertService.show(name);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._paymentsListComponent.matDrawer.close();
    }

}
