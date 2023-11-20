import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Payment, Plan} from 'app/modules/admin/payments/payments.types';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService
{
    // Private
    private _payment: BehaviorSubject<Payment | null> = new BehaviorSubject(null);
    private _payments: BehaviorSubject<Payment[] | null> = new BehaviorSubject(null);
    private _plans: BehaviorSubject<Plan[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for payment
     */
    get payment$(): Observable<Payment>
    {
        return this._payment.asObservable();
    }

    /**
     * Getter for payments
     */
    get payments$(): Observable<Payment[]>
    {
        return this._payments.asObservable();
    }

    /**
     * Getter for plans
     */
    get plans$(): Observable<Plan[]>
    {
        return this._plans.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get payments
     */
    getPayments(): Observable<Payment[]>
    {
        return this._httpClient.get<Payment[]>('api/apps/payments/all').pipe(
            tap((payments) => {
                this._payments.next(payments);
            })
        );
    }

    /**
     * Search payments with given query
     *
     * @param query
     */
    searchPayments(query: string): Observable<Payment[]>
    {
        return this._httpClient.get<Payment[]>('api/apps/payments/search', {
            params: {query}
        }).pipe(
            tap((payments) => {
                this._payments.next(payments);
            })
        );
    }

    /**
     * Get payment by id
     */
    getPaymentById(id: string): Observable<Payment>
    {
        return this._payments.pipe(
            take(1),
            map((payments) => {

                // Find the payment
                const payment = payments.find(item => item.id === id) || null;

                // Update the payment
                this._payment.next(payment);

                // Return the payment
                return payment;
            }),
            switchMap((payment) => {

                if ( !payment )
                {
                    return throwError('Could not found payment with id of ' + id + '!');
                }

                return of(payment);
            })
        );
    }

    /**
     * Create payment
     */
    createPayment(): Observable<Payment>
    {
        return this.payments$.pipe(
            take(1),
            switchMap(payments => this._httpClient.post<Payment>('api/apps/payments/payment', {}).pipe(
                map((newPayment) => {

                    // Update the payments with the new payment
                    this._payments.next([newPayment, ...payments]);

                    // Return the new payment
                    return newPayment;
                })
            ))
        );
    }

    /**
     * Update payment
     *
     * @param id
     * @param payment
     */
    updateClient(id: string, payment: Payment): Observable<Payment>
    {
        return this.payments$.pipe(
            take(1),
            switchMap(payments => this._httpClient.patch<Payment>('api/apps/payments/payment', {
                id,
                payment
            }).pipe(
                map((updatedPayment) => {

                    // Find the index of the updated payment
                    const index = payments.findIndex(item => item.id === id);

                    // Update the payment
                    payments[index] = updatedPayment;

                    // Update the payments
                    this._payments.next(payments);

                    // Return the updated payment
                    return updatedPayment;
                }),
                switchMap(updatedPayment => this.payment$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the payment if it's selected
                        this._payment.next(updatedPayment);

                        // Return the updated payment
                        return updatedPayment;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the payment
     *
     * @param id
     */
    deletePayment(id: string): Observable<boolean>
    {
        return this.payments$.pipe(
            take(1),
            switchMap(payments => this._httpClient.delete('api/apps/payments/payment', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted payment
                    const index = payments.findIndex(item => item.id === id);

                    // Delete the payment
                    payments.splice(index, 1);

                    // Update the payments
                    this._payments.next(payments);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get plans
     */
    getPlans(): Observable<Plan[]>
    {
        return this._httpClient.get<Plan[]>('api/apps/payments/plans').pipe(
            tap((plans) => {
                this._plans.next(plans);
            })
        );
    }

}
