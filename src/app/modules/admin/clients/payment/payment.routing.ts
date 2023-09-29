import { Route } from '@angular/router';
import { PaymentComponent } from 'app/modules/admin/clients/payment/payment.component';

export const paymentRoutes: Route[] = [
    {
        path     : '',
        component: PaymentComponent
    }
];
