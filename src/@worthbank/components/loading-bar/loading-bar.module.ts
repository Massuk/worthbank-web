import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WorthBankLoadingBarComponent } from '@worthbank/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        WorthBankLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        WorthBankLoadingBarComponent
    ]
})
export class WorthBankLoadingBarModule
{
}
