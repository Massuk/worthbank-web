import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Client, Country, Tag } from 'app/modules/admin/clients/clients.types';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService
{
    // Private
    private _client: BehaviorSubject<Client | null> = new BehaviorSubject(null);
    private _clients: BehaviorSubject<Client[] | null> = new BehaviorSubject(null);
    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);

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
     * Getter for client
     */
    get client$(): Observable<Client>
    {
        return this._client.asObservable();
    }

    /**
     * Getter for clients
     */
    get clients$(): Observable<Client[]>
    {
        return this._clients.asObservable();
    }

    /**
     * Getter for countries
     */
    get countries$(): Observable<Country[]>
    {
        return this._countries.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get clients
     */
    getPayments(): Observable<Client[]>
    {
        return this._httpClient.get<Client[]>('api/apps/clients/all').pipe(
            tap((clients) => {
                this._clients.next(clients);
            })
        );
    }

    /**
     * Search clients with given query
     *
     * @param query
     */
    searchClients(query: string): Observable<Client[]>
    {
        return this._httpClient.get<Client[]>('api/apps/clients/search', {
            params: {query}
        }).pipe(
            tap((clients) => {
                this._clients.next(clients);
            })
        );
    }

    /**
     * Get client by id
     */
    getClientById(id: string): Observable<Client>
    {
        return this._clients.pipe(
            take(1),
            map((clients) => {

                // Find the client
                const client = clients.find(item => item.id === id) || null;

                // Update the client
                this._client.next(client);

                // Return the client
                return client;
            }),
            switchMap((client) => {

                if ( !client )
                {
                    return throwError('Could not found client with id of ' + id + '!');
                }

                return of(client);
            })
        );
    }

    /**
     * Create client
     */
    createClient(): Observable<Client>
    {
        return this.clients$.pipe(
            take(1),
            switchMap(clients => this._httpClient.post<Client>('api/apps/clients/client', {}).pipe(
                map((newClient) => {

                    // Update the clients with the new client
                    this._clients.next([newClient, ...clients]);

                    // Return the new client
                    return newClient;
                })
            ))
        );
    }

    /**
     * Update client
     *
     * @param id
     * @param client
     */
    updateClient(id: string, client: Client): Observable<Client>
    {
        return this.clients$.pipe(
            take(1),
            switchMap(clients => this._httpClient.patch<Client>('api/apps/clients/client', {
                id,
                client
            }).pipe(
                map((updatedClient) => {

                    // Find the index of the updated client
                    const index = clients.findIndex(item => item.id === id);

                    // Update the client
                    clients[index] = updatedClient;

                    // Update the clients
                    this._clients.next(clients);

                    // Return the updated client
                    return updatedClient;
                }),
                switchMap(updatedClient => this.client$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the client if it's selected
                        this._client.next(updatedClient);

                        // Return the updated client
                        return updatedClient;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the client
     *
     * @param id
     */
    deleteClient(id: string): Observable<boolean>
    {
        return this.clients$.pipe(
            take(1),
            switchMap(clients => this._httpClient.delete('api/apps/clients/client', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted client
                    const index = clients.findIndex(item => item.id === id);

                    // Delete the client
                    clients.splice(index, 1);

                    // Update the clients
                    this._clients.next(clients);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get countries
     */
    getCountries(): Observable<Country[]>
    {
        return this._httpClient.get<Country[]>('api/apps/clients/countries').pipe(
            tap((countries) => {
                this._countries.next(countries);
            })
        );
    }

    /**
     * Update the avatar of the given client
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: string, avatar: File): Observable<Client>
    {
        return this.clients$.pipe(
            take(1),
            switchMap(clients => this._httpClient.post<Client>('api/apps/clients/avatar', {
                id,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedClient) => {

                    // Find the index of the updated client
                    const index = clients.findIndex(item => item.id === id);

                    // Update the client
                    clients[index] = updatedClient;

                    // Update the clients
                    this._clients.next(clients);

                    // Return the updated client
                    return updatedClient;
                }),
                switchMap(updatedClient => this.client$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the client if it's selected
                        this._client.next(updatedClient);

                        // Return the updated client
                        return updatedClient;
                    })
                ))
            ))
        );
    }
}
