import { NgModule } from '@angular/core';
import { WorthBankScrollbarDirective } from '@worthbank/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        WorthBankScrollbarDirective
    ],
    exports     : [
        WorthBankScrollbarDirective
    ]
})
export class WorthBankScrollbarModule
{
}
