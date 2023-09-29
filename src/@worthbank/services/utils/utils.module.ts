import { NgModule } from '@angular/core';
import { WorthBankUtilsService } from '@worthbank/services/utils/utils.service';

@NgModule({
    providers: [
        WorthBankUtilsService
    ]
})
export class WorthBankUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _worthbankUtilsService: WorthBankUtilsService)
    {
    }
}
