import { Route } from '@angular/router';
import { CanDeactivateClientsDetails } from 'app/modules/admin/clients/clients.guards';
import { ClientsClientResolver, ClientsCountriesResolver, ClientsResolver } from 'app/modules/admin/clients/clients.resolvers';
import { ClientsComponent } from 'app/modules/admin/clients/clients.component';
import { ClientsListComponent } from 'app/modules/admin/clients/list/list.component';
import { ClientsDetailsComponent } from 'app/modules/admin/clients/details/details.component';
import { PaymentComponent } from './payment/payment.component';

export const clientsRoutes: Route[] = [
    {
        path     : '',
        component: ClientsComponent,
        children : [
            {
                path     : '',
                component: ClientsListComponent,
                resolve  : {
                    clients : ClientsResolver,
                    countries: ClientsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ClientsDetailsComponent,
                        resolve      : {
                            client  : ClientsClientResolver,
                            countries: ClientsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateClientsDetails]
                    }
                ]
            }
        ]
    }
];
