import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Brand, Car } from 'app/modules/admin/catalog/catalog.types';

@Injectable({
    providedIn: 'root'
})
export class CatalogService
{
    // Private
    private _brands: BehaviorSubject<Brand[] | null> = new BehaviorSubject(null);
    private _car: BehaviorSubject<Car | null> = new BehaviorSubject(null);
    private _cars: BehaviorSubject<Car[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for brands
     */
    get brands$(): Observable<Brand[]>
    {
        return this._brands.asObservable();
    }

    /**
     * Getter for cars
     */
    get cars$(): Observable<Car[]>
    {
        return this._cars.asObservable();
    }

    /**
     * Getter for car
     */
    get car$(): Observable<Car>
    {
        return this._car.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get brands
     */
    getCategories(): Observable<Brand[]>
    {
        return this._httpClient.get<Brand[]>('api/apps/catalog/brands').pipe(
            tap((response: any) => {
                this._brands.next(response);
            })
        );
    }

    /**
     * Get cars
     */
    getCars(): Observable<Car[]>
    {
        return this._httpClient.get<Car[]>('api/apps/catalog/cars').pipe(
            tap((response: any) => {
                this._cars.next(response);
            })
        );
    }

    /**
     * Get car by id
     */
    getCarById(id: string): Observable<Car>
    {
        return this._httpClient.get<Car>('api/apps/catalog/cars/car', {params: {id}}).pipe(
            map((car) => {

                // Update the car
                this._car.next(car);

                // Return the car
                return car;
            }),
            switchMap((car) => {

                if ( !car )
                {
                    return throwError('Could not found car with id of ' + id + '!');
                }

                return of(car);
            })
        );
    }
}
