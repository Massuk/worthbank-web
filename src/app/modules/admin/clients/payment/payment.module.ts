import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { PaymentComponent } from 'app/modules/admin/clients/payment/payment.component';
import { paymentRoutes } from 'app/modules/admin/clients/payment/payment.routing';

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports     : [
        RouterModule.forChild(paymentRoutes),
        CdkScrollableModule
    ]
})
export class PaymentModule
{
}
