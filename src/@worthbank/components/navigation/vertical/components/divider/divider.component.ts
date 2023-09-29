import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WorthBankVerticalNavigationComponent } from '@worthbank/components/navigation/vertical/vertical.component';
import { WorthBankNavigationService } from '@worthbank/components/navigation/navigation.service';
import { WorthBankNavigationItem } from '@worthbank/components/navigation/navigation.types';

@Component({
    selector       : 'worthbank-vertical-navigation-divider-item',
    templateUrl    : './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorthBankVerticalNavigationDividerItemComponent implements OnInit, OnDestroy
{
    @Input() item: WorthBankNavigationItem;
    @Input() name: string;

    private _worthbankVerticalNavigationComponent: WorthBankVerticalNavigationComponent;
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
        this._worthbankVerticalNavigationComponent = this._worthbankNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._worthbankVerticalNavigationComponent.onRefreshed.pipe(
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
