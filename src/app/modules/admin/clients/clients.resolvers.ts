import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ClientsService } from 'app/modules/admin/clients/clients.service';
import { Client, Country, Tag } from 'app/modules/admin/clients/clients.types';

@Injectable({
    providedIn: 'root'
})
export class ClientsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _clientsService: ClientsService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client[]>
    {
        return this._clientsService.getClients();
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
        private _clientsService: ClientsService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client>
    {
        return this._clientsService.getClientById(route.paramMap.get('id'))
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
    constructor(private _clientsService: ClientsService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]>
    {
        return this._clientsService.getCountries();
    }
}
