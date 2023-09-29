import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { WorthBankNavigationItem, WorthBankNavigationService } from '@worthbank/components/navigation';
import { WorthBankMockApiService } from '@worthbank/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';
import { clients } from 'app/mock-api/apps/clients/data';

@Injectable({
    providedIn: 'root'
})
export class SearchMockApi
{
    private readonly _defaultNavigation: WorthBankNavigationItem[] = defaultNavigation;
    private readonly _clients: any[] = clients;

    /**
     * Constructor
     */
    constructor(
        private _worthbankMockApiService: WorthBankMockApiService,
        private _worthbankNavigationService: WorthBankNavigationService
    )
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
        // Get the flat navigation and store it
        const flatNavigation = this._worthbankNavigationService.getFlatNavigation(this._defaultNavigation);

        // -----------------------------------------------------------------------------------------------------
        // @ Search results - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onPost('api/common/search')
            .reply(({request}) => {

                // Get the search query
                const query = cloneDeep(request.body.query.toLowerCase());

                // If the search query is an empty string,
                // return an empty array
                if ( query === '' )
                {
                    return [200, {results: []}];
                }

                // Filter the clients
                const clientsResults = cloneDeep(this._clients)
                    .filter(client => client.name.toLowerCase().includes(query));

                // Filter the navigation
                const pagesResults = cloneDeep(flatNavigation)
                    .filter(page => (page.title?.toLowerCase().includes(query) || (page.subtitle && page.subtitle.includes(query))));

                // Prepare the results array
                const results = [];

                // If there are clients results...
                if ( clientsResults.length > 0 )
                {
                    // Normalize the results
                    clientsResults.forEach((result) => {

                        // Add a link
                        result.link = '/apps/clients/' + result.id;

                        // Add the name as the value
                        result.value = result.name;
                    });

                    // Add to the results
                    results.push({
                        id     : 'clients',
                        label  : 'Clientes',
                        results: clientsResults
                    });
                }

                // If there are page results...
                if ( pagesResults.length > 0 )
                {
                    // Normalize the results
                    pagesResults.forEach((result: any) => {

                        // Add the page title as the value
                        result.value = result.title;
                    });

                    // Add to the results
                    results.push({
                        id     : 'pages',
                        label  : 'Páginas',
                        results: pagesResults
                    });
                }

                // Return the response
                return [200, results];
            });
    }
}
