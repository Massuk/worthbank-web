import { NgModule } from '@angular/core';
import { WorthBankMediaWatcherService } from '@worthbank/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        WorthBankMediaWatcherService
    ]
})
export class WorthBankMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _worthbankMediaWatcherService: WorthBankMediaWatcherService)
    {
    }
}
