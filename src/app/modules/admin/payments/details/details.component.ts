import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsListComponent } from '../list/list.component';
import { WorthBankConfirmationService } from '@worthbank/services/confirmation';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, combineLatest, startWith, switchMap, takeUntil } from 'rxjs';
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
    maxValue: number;
    clients: Client[];
    cars: Car[];
    car: Car;
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
            moneda: ['dolares', [Validators.required]],
            tipoCambio: [{value: 3.85, disabled: true}, [Validators.required]],
            porcentajeCuotaInicial: ['', [Validators.required, Validators.min(20), Validators.max(49)]],
            cuotaInicial: [{value:'', disabled: true}, [Validators.required]],
            montoPrestamo: [{value:'', disabled: true}, [Validators.required]],
            porcentajeCuotaFinal: ['', [Validators.required, Validators.min(35),]],
            precioVenta: [{value:'', disabled: true}, [Validators.required]],
            //porcentajeSeguroVehicular: ['', [Validators.required]],
            costosIniciales: [{value: 82.86, disabled: true}, [Validators.required]],
            cuotaFinal: [{value:'', disabled: true}, [Validators.required]],
            porcentajeFinancEnCuotas: [{value:'', disabled: true}, [Validators.required]],
            financEnCuotas: [{value:'', disabled: true}, [Validators.required]],
            tipoTasa: ['nominal', [Validators.required]],
            tasa: ['', [Validators.required]],
            plan: [24, [Validators.required]],
            seguroDesgravamen: ['', [Validators.required]],
            tipoPeriodoGracia: ['parcial', [Validators.required]],
            periodosGracia: ['', [Validators.required]],
            //tasaDescuento: ['', [Validators.required]],
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
        
        // Fill price field with selected car price
        this.setupFormChanges();
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

    /**
     * Operations
     */
    calculateValues(): void {
        
    }

    setupFormChanges(): void {
        this.paymentForm.get('vehiculo').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((selectedCarId: string) => {
            console.log('Selected Car ID:', selectedCarId);

            if (!selectedCarId) {
                console.log('No selected car ID');
                this.paymentForm.get('precioVenta').setValue('0');
                return;
            }

            combineLatest([
                this._catalogService.getCarById(selectedCarId),
                this.paymentForm.get('moneda').valueChanges.pipe(startWith(this.paymentForm.get('moneda').value))
            ]).pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    ([car, selectedCurrency]: [Car, string]) => {

                        // Calcular el precio según la moneda seleccionada
                        const calculatedPrice = selectedCurrency === 'soles' ? car.price * this.paymentForm.get('tipoCambio').value : car.price;

                        // Actualizar el formulario con el precio calculado
                        this.paymentForm.get('precioVenta').setValue(calculatedPrice);
                    },
                    (error) => {
                        console.error('Error al obtener el carro:', error);
                    }
                );
        });
        
        this.paymentForm.get('moneda').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((selectedMoneda: string) => {
            // Actualizar a dolares el costo inicial
            let costosIniciales: number = this.paymentForm.get('costosIniciales').value;
            if (selectedMoneda === 'dolares') {
                const tipoCambio = this.paymentForm.get('tipoCambio').value;
                costosIniciales /= tipoCambio;
                costosIniciales = +costosIniciales.toFixed(2);
            } else {
                costosIniciales = 319;
            }
            this.paymentForm.get('costosIniciales').setValue(costosIniciales);

            // Poner 0 en el campo de porcentajeCuotaInicial cada que se cambia la moneda
            this.paymentForm.get('porcentajeCuotaInicial').setValue(0);
            this.paymentForm.get('porcentajeCuotaFinal').setValue(0);
            this.paymentForm.get('porcentajeFinancEnCuotas').setValue(0);
        });

    
        this.paymentForm.get('porcentajeCuotaInicial').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((porcentajeCuotaInicial: number) => {
            // Obtener el valor de precioVenta
            const precioVenta = this.paymentForm.get('precioVenta').value;

            // Calcular la cuota inicial
            const cuotaInicial = (porcentajeCuotaInicial * precioVenta) / 100;

            // Actualizar el formulario con la cuota inicial calculada
            this.paymentForm.get('cuotaInicial').setValue(cuotaInicial);

            // Obtener el valor de costosIniciales
            const costosIniciales = this.paymentForm.get('costosIniciales').value;
            
            // Calcular el monto del préstamo
            const montoPrestamo = precioVenta - cuotaInicial + costosIniciales;

            // Actualizar el formulario con el monto del préstamo calculado
            this.paymentForm.get('montoPrestamo').setValue(montoPrestamo);

            // Calcula el valor máximo para porcentajeCuotaFinal
            this.maxValue = 100 - this.paymentForm.get('porcentajeCuotaInicial').value - 11;
            if (this.maxValue > 50) {
                this.maxValue = 50;
            }

            // Actualiza el formulario con el nuevo valor máximo
            this.paymentForm.get('porcentajeCuotaFinal').setValidators([Validators.required, Validators.min(35), Validators.max(this.maxValue)]);
            this.paymentForm.get('porcentajeCuotaFinal').updateValueAndValidity();

            // Calcula el valor máximo para porcentajeFinancEnCuotas
            this.paymentForm.get('porcentajeFinancEnCuotas').setValue(100 - this.paymentForm.get('porcentajeCuotaInicial').value - this.paymentForm.get('porcentajeCuotaFinal').value);
        });

        this.paymentForm.get('porcentajeCuotaFinal').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((porcentajeCuotaFinal: number) => {
            // Obtener el valor de precioVenta
            const precioVenta = this.paymentForm.get('precioVenta').value;

            // Calcular la cuota final
            const cuotaFinal = (porcentajeCuotaFinal * precioVenta) / 100;

            // Actualizar el formulario con la cuota inicial calculada
            this.paymentForm.get('cuotaFinal').setValue(cuotaFinal);

            // Calcula el valor máximo para porcentajeFinancEnCuotas
            this.paymentForm.get('porcentajeFinancEnCuotas').setValue(100 - this.paymentForm.get('porcentajeCuotaInicial').value - this.paymentForm.get('porcentajeCuotaFinal').value);
        });

        this.paymentForm.get('porcentajeFinancEnCuotas').valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((porcentajeFinancEnCuotas: number) => {
            // Obtener el valor de precioVenta
            const precioVenta = this.paymentForm.get('precioVenta').value;

            // Calcular el monto de financEnCuotas
            const financEnCuotas = (porcentajeFinancEnCuotas * precioVenta) / 100;

            // Actualizar el formulario con la financEnCuotas calculada
            this.paymentForm.get('financEnCuotas').setValue(financEnCuotas);
        });
    }

    probar(){
        Object.keys(this.paymentForm.controls).forEach(controlName => {
            console.log(`Estado del control ${controlName}:`, this.paymentForm.get(controlName).status);
          });
    }
}
