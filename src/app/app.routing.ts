import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboard/home'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard/home' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'dashboard/home',
    },

    // Auth routes for not logged users
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: 'dashboard',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/admin/project/project.module').then(
                        (m) => m.ProjectModule
                    ),
            },
            {
                path: 'clients',
                children: [
                    { path: '', loadChildren: () =>import('app/modules/admin/clients/clients.module').then((m) => m.ClientsModule) },
                    // { path: 'payment', loadChildren: () =>import('app/modules/admin/clients/payment/payment.module').then((m) => m.PaymentModule) }
                ]
            },
            {
                path: 'catalog',
                loadChildren: () =>
                    import('app/modules/admin/catalog/catalog.module').then(
                        (m) => m.CatalogModule
                    ),
            },
            {
                path: 'payment',
                loadChildren: () =>
                    import('app/modules/admin/clients/payment/payment.module').then(
                        (m) => m.PaymentModule
                    ),
            },
        ],
    },
];
