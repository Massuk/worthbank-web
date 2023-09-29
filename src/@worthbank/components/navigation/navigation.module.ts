import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorthBankScrollbarModule } from '@worthbank/directives/scrollbar/public-api';
import { WorthBankHorizontalNavigationBasicItemComponent } from '@worthbank/components/navigation/horizontal/components/basic/basic.component';
import { WorthBankHorizontalNavigationBranchItemComponent } from '@worthbank/components/navigation/horizontal/components/branch/branch.component';
import { WorthBankHorizontalNavigationDividerItemComponent } from '@worthbank/components/navigation/horizontal/components/divider/divider.component';
import { WorthBankHorizontalNavigationSpacerItemComponent } from '@worthbank/components/navigation/horizontal/components/spacer/spacer.component';
import { WorthBankHorizontalNavigationComponent } from '@worthbank/components/navigation/horizontal/horizontal.component';
import { WorthBankVerticalNavigationAsideItemComponent } from '@worthbank/components/navigation/vertical/components/aside/aside.component';
import { WorthBankVerticalNavigationBasicItemComponent } from '@worthbank/components/navigation/vertical/components/basic/basic.component';
import { WorthBankVerticalNavigationCollapsableItemComponent } from '@worthbank/components/navigation/vertical/components/collapsable/collapsable.component';
import { WorthBankVerticalNavigationDividerItemComponent } from '@worthbank/components/navigation/vertical/components/divider/divider.component';
import { WorthBankVerticalNavigationGroupItemComponent } from '@worthbank/components/navigation/vertical/components/group/group.component';
import { WorthBankVerticalNavigationSpacerItemComponent } from '@worthbank/components/navigation/vertical/components/spacer/spacer.component';
import { WorthBankVerticalNavigationComponent } from '@worthbank/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        WorthBankHorizontalNavigationBasicItemComponent,
        WorthBankHorizontalNavigationBranchItemComponent,
        WorthBankHorizontalNavigationDividerItemComponent,
        WorthBankHorizontalNavigationSpacerItemComponent,
        WorthBankHorizontalNavigationComponent,
        WorthBankVerticalNavigationAsideItemComponent,
        WorthBankVerticalNavigationBasicItemComponent,
        WorthBankVerticalNavigationCollapsableItemComponent,
        WorthBankVerticalNavigationDividerItemComponent,
        WorthBankVerticalNavigationGroupItemComponent,
        WorthBankVerticalNavigationSpacerItemComponent,
        WorthBankVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        WorthBankScrollbarModule
    ],
    exports     : [
        WorthBankHorizontalNavigationComponent,
        WorthBankVerticalNavigationComponent
    ]
})
export class WorthBankNavigationModule
{
}
