import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { WorthBankConfirmationService } from '@worthbank/services/confirmation/confirmation.service';
import { WorthBankConfirmationDialogComponent } from '@worthbank/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        WorthBankConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        WorthBankConfirmationService
    ]
})
export class WorthBankConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _worthbankConfirmationService: WorthBankConfirmationService)
    {
    }
}
