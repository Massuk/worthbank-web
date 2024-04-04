import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static create(arg0: string, formData: any) {
      throw new Error('Method not implemented.');
  }
  // Declaramos variables con las que trabajaremos
  private url = 'http://apibank.acamposdigital.com/api/v1/';

  // Agregamos HttpClient para usar sus métodos
  constructor(private http: HttpClient) {}

  // Función Create
  store( endpoint: any, data: any){
    console.log(data)
    const data2 = {
        cliente: JSON.stringify(data.cliente),
        vehiculo: JSON.stringify(data.vehiculo),
        moneda: data.moneda,
        porcentajeCuotaInicial: data.porcentajeCuotaInicial,
        porcentajeCuotaFinal: data.porcentajeCuotaFinal,
        seguroDesgravamen: data.seguroDesgravamen,
        tasa: data.tasa,
        tasaDescuento: data.tasaDescuento,
        tipoPeriodoGracia: data.tipoPeriodoGracia,
        tipoTasa: data.tipoTasa,
        plan: data.plan,
        periodosGracia: data.periodosGracia,
        montoPrestamo: data.montoPrestamo,
        cuotaFinal: data.cuotaFinal,
        cuotaInicial: data.cuotaInicial
    }   
    return this.http.post(this.url+endpoint, data2);
  }

  get()
  {
    return this.http.get(this.url+'planes')
  }

  getPlan(id: any)
  {
    return this.http.get(this.url+'planes/'+id, { responseType: 'text' as 'json' })
  }

  // Función Read
//   read() {
//     return this.http.get<Plan[]>(this.url);
//   }

  // Función View
//   get(id: number): Observable<Plan> {
//     return this.http.get<Plan>(`${this.url}/${id}`);
//   }

  // Función Delete
//   delete(id: number): Observable<any> {
//     const url = `${this.url}/${id}`;
//     return this.http.delete(url);
//   }
}
