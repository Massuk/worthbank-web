import { NgModule } from '@angular/core';
import { WorthBankPlatformService } from '@worthbank/services/platform/platform.service';

@NgModule({
    providers: [
        WorthBankPlatformService
    ]
})
export class WorthBankPlatformModule
{
    /**
     * Constructor
     */
    constructor(private _worthbankPlatformService: WorthBankPlatformService)
    {
    }
}
