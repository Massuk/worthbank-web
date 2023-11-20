import { Route } from '@angular/router';
import { PaymentsComponent } from 'app/modules/admin/payments/payments.component';
import { PaymentsListComponent } from 'app/modules/admin/payments/list/list.component';
import { PaymentsDetailsComponent } from 'app/modules/admin/payments/details/details.component';
import { CanDeactivatePaymentsDetails } from 'app/modules/admin/payments/payments.guards';
import { ClientsResolver } from '../clients/clients.resolvers';
import { CatalogCarsResolver } from '../catalog/catalog.resolvers';
import { PaymentsResolver } from './payments.resolver';

export const paymentsRoutes: Route[] = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: '',
        component: PaymentsListComponent,
        children: [
          {
            path: 'details',
            component: PaymentsDetailsComponent,
            resolve: {
              client: ClientsResolver,
              cars: CatalogCarsResolver,
              payment: PaymentsResolver
            },
            canDeactivate: [CanDeactivatePaymentsDetails],
          },
        ]
      }
    ]
  }
];
