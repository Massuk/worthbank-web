import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Payment, Plan} from 'app/modules/admin/payments/payments.types';
import { PaymentsService } from './payments.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _paymentsService: PaymentsService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Payment[]>
    {
        return this._paymentsService.getPayments();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ClientsClientResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _paymentsService: PaymentsService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Payment>
    {
        return this._paymentsService.getPaymentById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested client is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class ClientsCountriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _paymentsService: PaymentsService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plan[]>
    {
        return this._paymentsService.getPlans();
    }
}
