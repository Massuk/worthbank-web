import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorthBankAlertComponent } from '@worthbank/components/alert/alert.component';

@NgModule({
    declarations: [
        WorthBankAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        WorthBankAlertComponent
    ]
})
export class WorthBankAlertModule
{
}
