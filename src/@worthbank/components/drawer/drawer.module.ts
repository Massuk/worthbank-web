import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorthBankDrawerComponent } from '@worthbank/components/drawer/drawer.component';

@NgModule({
    declarations: [
        WorthBankDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        WorthBankDrawerComponent
    ]
})
export class WorthBankDrawerModule
{
}
