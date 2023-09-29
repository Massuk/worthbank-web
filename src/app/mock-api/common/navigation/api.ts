import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { WorthBankNavigationItem } from '@worthbank/components/navigation';
import { WorthBankMockApiService } from '@worthbank/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{

    private readonly _defaultNavigation: WorthBankNavigationItem[] = defaultNavigation;

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
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/common/navigation')
            .reply(() => {
                return [
                    200,
                    {
                        default   : cloneDeep(this._defaultNavigation),
                    }
                ];
            });
    }
}
