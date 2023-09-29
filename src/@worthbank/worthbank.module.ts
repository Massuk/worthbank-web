import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { WorthBankConfirmationModule } from '@worthbank/services/confirmation';
import { WorthBankLoadingModule } from '@worthbank/services/loading';
import { WorthBankMediaWatcherModule } from '@worthbank/services/media-watcher/media-watcher.module';
import { WorthBankPlatformModule } from '@worthbank/services/platform/platform.module';
import { WorthBankSplashScreenModule } from '@worthbank/services/splash-screen/splash-screen.module';
import { WorthBankUtilsModule } from '@worthbank/services/utils/utils.module';

@NgModule({
    imports  : [
        WorthBankConfirmationModule,
        WorthBankLoadingModule,
        WorthBankMediaWatcherModule,
        WorthBankPlatformModule,
        WorthBankSplashScreenModule,
        WorthBankUtilsModule
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true
            }
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class WorthBankModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: WorthBankModule)
    {
        if ( parentModule )
        {
            throw new Error('WorthBankModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
