import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { CatalogService } from 'app/modules/admin/catalog/catalog.service';
import { Brand, Car } from 'app/modules/admin/catalog/catalog.types';

@Component({
    selector       : 'catalog-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogListComponent implements OnInit, OnDestroy
{
    brands: Brand[];
    cars: Car[];
    filteredCars: Car[];
    filters: {
        brandSlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideUnavailable$: BehaviorSubject<boolean>;
    } = {
        brandSlug$ : new BehaviorSubject('all'),
        query$        : new BehaviorSubject(''),
        hideUnavailable$: new BehaviorSubject(false)
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _catalogService: CatalogService
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
        // Get the brands
        this._catalogService.brands$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((brands: Brand[]) => {
                this.brands = brands;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the cars
        this._catalogService.cars$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cars: Car[]) => {
                this.cars = this.filteredCars = cars;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Filter the cars
        combineLatest([this.filters.brandSlug$, this.filters.query$, this.filters.hideUnavailable$])
            .subscribe(([brandSlug, query, hideUnavailable]) => {

                // Reset the filtered cars
                this.filteredCars = this.cars;

                // Filter by brand
                if ( brandSlug !== 'all' )
                {
                    this.filteredCars = this.filteredCars.filter(car => car.brand === brandSlug);
                }

                // Filter by search query
                if ( query !== '' )
                {
                    this.filteredCars = this.filteredCars.filter(car => car.fuelType.toLowerCase().includes(query.toLowerCase())
                        || car.fuelType.toLowerCase().includes(query.toLowerCase())
                        || car.brand.toLowerCase().includes(query.toLowerCase()));
                }

                // Filter by availability
                if ( hideUnavailable )
                {
                    this.filteredCars = this.filteredCars.filter(car => car.available === true);
                }
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void
    {
        this.filters.query$.next(query);
    }

    /**
     * Filter by brand
     *
     * @param change
     */
    filterByBrand(change: MatSelectChange): void
    {
        this.filters.brandSlug$.next(change.value);
    }

    /**
     * Show/hide available cars
     *
     * @param change
     */
    toggleAvailable(change: MatSlideToggleChange): void
    {
        this.filters.hideUnavailable$.next(change.checked);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
