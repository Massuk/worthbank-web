import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { WorthBankMockApiService, WorthBankMockApiUtils } from '@worthbank/lib/mock-api';
import { payments as paymentsData } from 'app/mock-api/apps/payments/data';

@Injectable({
    providedIn: 'root'
})
export class PaymentsMockApi
{
    private _payments: any[] = paymentsData;

    /**
     * Constructor
     */
    constructor(private _worthbankMockApiService: WorthBankMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Payments - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/payments/all')
            .reply(() => {

                // Clone the payments
                const payments = cloneDeep(this._payments);

                // Sort the payments alphabetically by name
                payments.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, payments];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Payments Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/payments/search')
            .reply(({ request }) => {

                // Get the search query
                const query = request.params.get('query');

                // Clone the payments
                let payments = cloneDeep(this._payments);

                // If the query exists...
                if (query) {
                    // Filter the payments
                    payments = payments.filter(payment => payment.name && payment.name.toLowerCase().includes(query.toLowerCase()));
                }

                // Sort the payments by the name field by default
                payments.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, payments];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Payment - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/payments/payment')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the payments
                const payments = cloneDeep(this._payments);

                // Find the payment
                const payment = payments.find(item => item.id === id);

                // Return the response
                return [200, payment];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Payment - POST
        // -----------------------------------------------------------------------------------------------------
        // this._worthbankMockApiService
        //     .onPost('api/apps/payments/payment')
        //     .reply(() => {

        //         // Generate a new payment
        //         const newPayment = {
        //             id: WorthBankMockApiUtils.guid(),
        //             avatar: null,
        //             background: 'assets/images/cards/14-640x480.jpg',
        //             name: 'Nuevo cliente',
        //             email: '',
        //             phoneNumbers: [],
        //             title: '',
        //             company: '',
        //             birthday: null,
        //             address: null,
        //             notes: null,
        //         };

        //         // Unshift the new payment
        //         this._payments.unshift(newPayment);

        //         // Return the response
        //         return [200, newPayment];
        //     });

        // -----------------------------------------------------------------------------------------------------
        // @ Payment - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onPatch('api/apps/payments/payment')
            .reply(({ request }) => {

                // Get the id and payment
                const id = request.body.id;
                const payment = cloneDeep(request.body.payment);

                // Prepare the updated payment
                let updatedPayment = null;

                // Find the payment and update it
                this._payments.forEach((item, index, payments) => {

                    if (item.id === id) {
                        // Update the payment
                        payments[index] = assign({}, payments[index], payment);

                        // Store the updated payment
                        updatedPayment = payments[index];
                    }
                });

                // Return the response
                return [200, updatedPayment];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Payment - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onDelete('api/apps/payments/payment')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the payment and delete it
                this._payments.forEach((item, index) => {

                    if (item.id === id) {
                        this._payments.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });
    }
}
