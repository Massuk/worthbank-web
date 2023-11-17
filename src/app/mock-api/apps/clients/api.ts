import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { assign, cloneDeep } from 'lodash-es';
import { WorthBankMockApiService, WorthBankMockApiUtils } from '@worthbank/lib/mock-api';
import { clients as clientsData, countries as countriesData } from 'app/mock-api/apps/clients/data';

@Injectable({
    providedIn: 'root'
})
export class ClientsMockApi {
    private _clients: any[] = clientsData;
    private _countries: any[] = countriesData;

    /**
     * Constructor
     */
    constructor(private _worthbankMockApiService: WorthBankMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Clients - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/clients/all')
            .reply(() => {

                // Clone the clients
                const clients = cloneDeep(this._clients);

                // Sort the clients by the name field by default
                clients.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, clients];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Clients Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/clients/search')
            .reply(({ request }) => {

                // Get the search query
                const query = request.params.get('query');

                // Clone the clients
                let clients = cloneDeep(this._clients);

                // If the query exists...
                if (query) {
                    // Filter the clients
                    clients = clients.filter(client => client.name && client.name.toLowerCase().includes(query.toLowerCase()));
                }

                // Sort the clients by the name field by default
                clients.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, clients];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Client - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/clients/client')
            .reply(({ request }) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the clients
                const clients = cloneDeep(this._clients);

                // Find the client
                const client = clients.find(item => item.id === id);

                // Return the response
                return [200, client];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Client - POST
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onPost('api/apps/clients/client')
            .reply(() => {

                // Generate a new client
                const newClient = {
                    id: WorthBankMockApiUtils.guid(),
                    avatar: null,
                    background: 'assets/images/cards/14-640x480.jpg',
                    name: 'Nuevo cliente',
                    email: '',
                    phoneNumbers: [],
                    title: '',
                    company: '',
                    birthday: null,
                    address: null,
                    notes: null,
                };

                // Unshift the new client
                this._clients.unshift(newClient);

                // Return the response
                return [200, newClient];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Client - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onPatch('api/apps/clients/client')
            .reply(({ request }) => {

                // Get the id and client
                const id = request.body.id;
                const client = cloneDeep(request.body.client);

                // Prepare the updated client
                let updatedClient = null;

                // Find the client and update it
                this._clients.forEach((item, index, clients) => {

                    if (item.id === id) {
                        // Update the client
                        clients[index] = assign({}, clients[index], client);

                        // Store the updated client
                        updatedClient = clients[index];
                    }
                });

                // Return the response
                return [200, updatedClient];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Client - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onDelete('api/apps/clients/client')
            .reply(({ request }) => {

                // Get the id
                const id = request.params.get('id');

                // Find the client and delete it
                this._clients.forEach((item, index) => {

                    if (item.id === id) {
                        this._clients.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Countries - GET
        // -----------------------------------------------------------------------------------------------------
        this._worthbankMockApiService
            .onGet('api/apps/clients/countries')
            .reply(() => [200, cloneDeep(this._countries)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Avatar - POST
        // -----------------------------------------------------------------------------------------------------

        /**
         * Read the given file as mock-api url
         *
         * @param file
         */
        const readAsDataURL = (file: File): Promise<any> =>

            // Return a new promise
            new Promise((resolve, reject) => {

                // Create a new reader
                const reader = new FileReader();

                // Resolve the promise on success
                reader.onload = (): void => {
                    resolve(reader.result);
                };

                // Reject the promise on error
                reader.onerror = (e): void => {
                    reject(e);
                };

                // Read the file as the
                reader.readAsDataURL(file);
            })
            ;

        this._worthbankMockApiService
            .onPost('api/apps/clients/avatar')
            .reply(({ request }) => {

                // Get the id and avatar
                const id = request.body.id;
                const avatar = request.body.avatar;

                // Prepare the updated client
                let updatedClient: any = null;

                // In a real world application, this would return the path
                // of the saved image file (from host, S3 bucket, etc.) but,
                // for the sake of the demo, we encode the image to base64
                // and return it as the new path of the uploaded image since
                // the src attribute of the img tag works with both image urls
                // and encoded images.
                return from(readAsDataURL(avatar)).pipe(
                    map((path) => {

                        // Find the client and update it
                        this._clients.forEach((item, index, clients) => {

                            if (item.id === id) {
                                // Update the avatar
                                clients[index].avatar = path;

                                // Store the updated client
                                updatedClient = clients[index];
                            }
                        });

                        // Return the response
                        return [200, updatedClient];
                    })
                );
            });
    }
}
