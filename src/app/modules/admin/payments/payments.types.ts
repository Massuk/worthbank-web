export interface Payment
{
    id?: string;
    name?: string;
    cliente?: string;
    vehiculo?: string;
    moneda?: string;
    tipoCambio?: number;
    porcentajeCuotaInicial?: number;
    cuotaInicial?: number;
    montoPrestamo?: number;
    porcentajeCuotaFinal?: number;
    precioVenta?: number;
    porcentajeSeguroVehicular?: number;
    costosIniciales?: number;
    cuotaFinal?: number;
    porcentajeFinancEnCuotas?: number;
    financEnCuotas?: number;
    tipoTasa?: string;
    tasa?: number;
    plan?: string;
    seguroDesgravamen?: string;
    tipoPeriodoGracia?: string;
    periodosGracia?: number;
}

export interface Plan
{
    id?: string;
    van?: number;
    tir?: number;
}

