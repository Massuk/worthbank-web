import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Brand, Car } from 'app/modules/admin/catalog/catalog.types';
import { CatalogService } from 'app/modules/admin/catalog/catalog.service';

@Injectable({
    providedIn: 'root'
})
export class CatalogCategoriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _catalogService: CatalogService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Brand[]>
    {
        return this._catalogService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CatalogCoursesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _catalogService: CatalogService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Car[]>
    {
        return this._catalogService.getCars();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CatalogCourseResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _catalogService: CatalogService
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Car>
    {
        return this._catalogService.getCarById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested task is not available
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
