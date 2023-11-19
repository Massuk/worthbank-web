import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'payments-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsListComponent implements OnInit{

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    paymentsPlanCount: number = 0;
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = [
        'name',
        'lastname',
        'status',
        'actions'
      ];
    
    ngOnInit(): void {
    }
    /**
     * Constructor
     */
    constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _changeDetectorRef: ChangeDetectorRef,

  ) {
    }

        // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    filter(e: any) {
        this.dataSource.filter = e.target.value.trim();
      }
    
      clearFilter() {
        this.dataSource.filter = '';
      }

          /**
     * Create payment
     */
    createPayment(): void
    {
            // Go to the new payment page
            this._router.navigate(['details'], {relativeTo: this._activatedRoute});
            this._changeDetectorRef.markForCheck();
    }
}
