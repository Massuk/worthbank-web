import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsDetailsComponent } from 'app/modules/admin/clients/details/details.component';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateClientsDetails implements CanDeactivate<ClientsDetailsComponent>
{
    canDeactivate(
        component: ClientsDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }

        // If the next state doesn't contain '/clients'
        // it means we are navigating away from the
        // clients app
        if ( !nextState.url.includes('/clients') )
        {
            // Let it navigate
            return true;
        }

        // If we are navigating to another client...
        if ( nextRoute.paramMap.get('id') )
        {
            // Just navigate
            return true;
        }
        // Otherwise...
        else
        {
            // Close the drawer first, and then navigate
            return component.closeDrawer().then(() => true);
        }
    }
}
