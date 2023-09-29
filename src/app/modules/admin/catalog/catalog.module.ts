import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorthBankFindByKeyPipeModule } from '@worthbank/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { catalogRoutes } from 'app/modules/admin/catalog/catalog.routing';
import { CatalogComponent } from 'app/modules/admin/catalog/catalog.component';
import { CatalogDetailsComponent } from 'app/modules/admin/catalog/details/details.component';
import { CatalogListComponent } from 'app/modules/admin/catalog/list/list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { WorthBankCardModule } from '@worthbank/components/card';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        CatalogComponent,
        CatalogDetailsComponent,
        CatalogListComponent
    ],
    imports     : [
        RouterModule.forChild(catalogRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        WorthBankFindByKeyPipeModule,
        SharedModule,
        MatTabsModule,
        WorthBankCardModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatMenuModule
    ]
})
export class CatalogModule
{
}
