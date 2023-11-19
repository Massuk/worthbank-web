import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'payments-plans',
    templateUrl: './plans.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsPlansComponent implements OnInit{
    
    ngOnInit(): void {
    }
    /**
     * Constructor
     */
    constructor(
  ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create plans
     */

}
