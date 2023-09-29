import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WorthBankHorizontalNavigationComponent } from '@worthbank/components/navigation/horizontal/horizontal.component';
import { WorthBankNavigationService } from '@worthbank/components/navigation/navigation.service';
import { WorthBankNavigationItem } from '@worthbank/components/navigation/navigation.types';

@Component({
    selector       : 'worthbank-horizontal-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorthBankHorizontalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: WorthBankNavigationItem;
    @Input() name: string;

    private _worthbankHorizontalNavigationComponent: WorthBankHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _worthbankNavigationService: WorthBankNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._worthbankHorizontalNavigationComponent = this._worthbankNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._worthbankHorizontalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}