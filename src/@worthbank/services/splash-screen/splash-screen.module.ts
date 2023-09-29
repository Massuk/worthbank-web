import { NgModule } from '@angular/core';
import { WorthBankSplashScreenService } from '@worthbank/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        WorthBankSplashScreenService
    ]
})
export class WorthBankSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _worthbankSplashScreenService: WorthBankSplashScreenService)
    {
    }
}
