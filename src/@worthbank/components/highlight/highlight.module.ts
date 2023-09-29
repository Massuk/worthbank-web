import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorthBankHighlightComponent } from '@worthbank/components/highlight/highlight.component';

@NgModule({
    declarations: [
        WorthBankHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        WorthBankHighlightComponent
    ]
})
export class WorthBankHighlightModule
{
}
