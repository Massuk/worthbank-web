import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorthBankFindByKeyPipeModule } from '@worthbank/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentsListComponent } from 'app/modules/admin/payments/list/list.component';
import { paymentsRoutes } from 'app/modules/admin/payments/payments.routing';
import { PaymentsDetailsComponent } from 'app/modules/admin/payments/details/details.component';
import { PaymentsComponent } from 'app/modules/admin/payments/payments.component';
import { WorthBankAlertModule } from '@worthbank/components/alert';
import { CommonModule } from '@angular/common';
import { PaymentsPlansComponent } from './plans/plans.component';

@NgModule({
    declarations: [
        PaymentsComponent,
        PaymentsListComponent,
        PaymentsDetailsComponent,
        PaymentsPlansComponent,
    ],
    imports     : [
        RouterModule.forChild(paymentsRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        WorthBankFindByKeyPipeModule,
        SharedModule,
        CommonModule,
        WorthBankAlertModule
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'D'
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy'
                }
            }
        }
    ]
})
export class PaymentsModule
{
}
