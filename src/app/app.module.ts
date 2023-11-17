import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { WorthBankModule } from '@worthbank';
import { WorthBankConfigModule } from '@worthbank/services/config';
import { WorthBankMockApiModule } from '@worthbank/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DatePipe } from '@angular/common';

registerLocaleData(localeEs);

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // WorthBank, WorthBankConfig & WorthBankMockAPI
        WorthBankModule,
        WorthBankConfigModule.forRoot(appConfig),
        WorthBankMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Configura el idioma para los componentes de Angular Material
        { provide: LOCALE_ID, useValue: 'es' }, // Configura el idioma globalmente
        DatePipe,
    ]
})
export class AppModule {
}
