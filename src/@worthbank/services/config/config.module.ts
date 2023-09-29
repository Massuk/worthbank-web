import { ModuleWithProviders, NgModule } from '@angular/core';
import { WorthBankConfigService } from '@worthbank/services/config/config.service';
import { FUSE_APP_CONFIG } from '@worthbank/services/config/config.constants';

@NgModule()
export class WorthBankConfigModule
{
    /**
     * Constructor
     */
    constructor(private _worthbankConfigService: WorthBankConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<WorthBankConfigModule>
    {
        return {
            ngModule : WorthBankConfigModule,
            providers: [
                {
                    provide : FUSE_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
