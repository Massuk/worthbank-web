import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'clients',
    templateUrl    : './clients.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
