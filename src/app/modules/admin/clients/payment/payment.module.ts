import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { PaymentComponent } from 'app/modules/admin/clients/payment/payment.component';
import { paymentRoutes } from 'app/modules/admin/clients/payment/payment.routing';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports     : [
        RouterModule.forChild(paymentRoutes),
        CdkScrollableModule,
        MatTableModule
    ]
})
export class PaymentModule
{
}
