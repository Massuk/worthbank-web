import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WorthBankLoadingInterceptor } from '@worthbank/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: WorthBankLoadingInterceptor,
            multi   : true
        }
    ]
})
export class WorthBankLoadingModule
{
}
