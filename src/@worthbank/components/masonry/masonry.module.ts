import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorthBankMasonryComponent } from '@worthbank/components/masonry/masonry.component';

@NgModule({
    declarations: [
        WorthBankMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        WorthBankMasonryComponent
    ]
})
export class WorthBankMasonryModule
{
}
