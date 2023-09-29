import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorthBankConfirmationConfig } from '@worthbank/services/confirmation/confirmation.types';

@Component({
    selector     : 'worthbank-confirmation-dialog',
    templateUrl  : './dialog.component.html',
    styles       : [
        `
            .worthbank-confirmation-dialog-panel {

                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {

                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class WorthBankConfirmationDialogComponent
{
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: WorthBankConfirmationConfig)
    {
    }

}
