import { NgModule } from '@angular/core';
import { WorthBankFindByKeyPipe } from '@worthbank/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        WorthBankFindByKeyPipe
    ],
    exports     : [
        WorthBankFindByKeyPipe
    ]
})
export class WorthBankFindByKeyPipeModule
{
}
