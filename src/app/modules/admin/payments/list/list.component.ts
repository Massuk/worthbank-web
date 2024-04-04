import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'app/service/api.service';

@Component({
    selector: 'payments-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsListComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    paymentsPlans$: any[] = []
    paymentsPlanCount: number = 0;
    drawerMode: 'side' | 'over';
    
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    dataSource: any[] = [];
    mostrar: boolean = false

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = [
        'id',
        'name',
        'car',
        'price',
        'actions',
    ];

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _ApiService: ApiService
    ) {}

    ngOnInit(): void {
      this._ApiService.get().subscribe((response: any) => {
        this.dataSource = response
        this._changeDetectorRef.markForCheck();
      })
    }

    onBackdropClicked(): void {
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create payment
     */
    createPayment(): void {
        this._router.navigate(['details'], {
            relativeTo: this._activatedRoute,
        });
        this._changeDetectorRef.markForCheck();
    }
}
