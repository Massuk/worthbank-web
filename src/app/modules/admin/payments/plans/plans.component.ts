import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ApiService } from 'app/service/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'payments-plans',
    templateUrl: './plans.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPlansComponent implements OnInit {
  plan: any 
    /**
     * Constructor
     */
    constructor(
        private ApiService: ApiService,
        private activeroute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activeroute.params.subscribe((data: any) => {
            this.ApiService.getPlan(data.id).subscribe((response: any) => {
              this.plan = response
              console.log(this.plan)
            });
        });
    }
}
