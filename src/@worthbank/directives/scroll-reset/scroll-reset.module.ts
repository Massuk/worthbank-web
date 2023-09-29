import { NgModule } from '@angular/core';
import { WorthBankScrollResetDirective } from '@worthbank/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        WorthBankScrollResetDirective
    ],
    exports     : [
        WorthBankScrollResetDirective
    ]
})
export class WorthBankScrollResetModule
{
}
