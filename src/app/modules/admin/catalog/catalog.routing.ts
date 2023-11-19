import { Route } from '@angular/router';
import { CatalogComponent } from 'app/modules/admin/catalog/catalog.component';
import { CatalogListComponent } from 'app/modules/admin/catalog/list/list.component';
import { CatalogDetailsComponent } from 'app/modules/admin/catalog/details/details.component';
import { CatalogCategoriesResolver, CatalogCarResolver, CatalogCarsResolver } from 'app/modules/admin/catalog/catalog.resolvers';

export const catalogRoutes: Route[] = [
    {
        path     : '',
        component: CatalogComponent,
        resolve  : {
            categories: CatalogCategoriesResolver
        },
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: CatalogListComponent,
                resolve  : {
                    courses: CatalogCarsResolver
                }
            },
            {
                path     : ':id',
                component: CatalogDetailsComponent,
                resolve  : {
                    course: CatalogCarResolver
                }
            }
        ]
    }
];
