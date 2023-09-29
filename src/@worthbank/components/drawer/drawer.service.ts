import { Injectable } from '@angular/core';
import { WorthBankDrawerComponent } from '@worthbank/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root'
})
export class WorthBankDrawerService
{
    private _componentRegistry: Map<string, WorthBankDrawerComponent> = new Map<string, WorthBankDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: WorthBankDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): WorthBankDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
