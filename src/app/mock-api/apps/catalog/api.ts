import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { WorthBankMockApiService } from '@worthbank/lib/mock-api/mock-api.service';
import { brands as brandsData, cars as carsData } from 'app/mock-api/apps/catalog/data';

@Injectable({
    providedIn: 'root'
})
export class AcademyMockApi
{
    private _brands: any[] = brandsData;
    private _cars: any[] = carsData;

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
        // @ Categories - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/catalog/brands')
            .reply(() => {

                // Clone the categories
                const brands = cloneDeep(this._brands);

                // Sort the categories alphabetically by name
                brands.sort((a, b) => a.name.localeCompare(b.name));

                return [200, brands];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Cars - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/catalog/cars')
            .reply(() => {

                // Clone the cars
                const cars = cloneDeep(this._cars);

                return [200, cars];
            });
    }
}
