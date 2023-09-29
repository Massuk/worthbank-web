import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'catalog',
    templateUrl    : './catalog.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
