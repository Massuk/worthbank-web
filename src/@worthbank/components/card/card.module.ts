import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorthBankCardComponent } from '@worthbank/components/card/card.component';

@NgModule({
    declarations: [
        WorthBankCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        WorthBankCardComponent
    ]
})
export class WorthBankCardModule
{
}
