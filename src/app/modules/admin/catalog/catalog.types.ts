export interface Brand
{
    id?: string;
    name: string;
    badge: string;
}

export interface Car 
{
    id?: string;
    brand: string;
    model: string;
    description: string;
    year: number;
    fuelType: string;
    price: number;
    mileage: number;
    condition: string;
    available: boolean;
}

