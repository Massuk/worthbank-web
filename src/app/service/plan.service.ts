import { Injectable } from '@angular/core';
import { environment } from '../../environments/envinronment';
import { Plan } from '../model/plan';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const urlData = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  // Declaramos variables con las que trabajaremos
  private url = `${urlData}/plans`;

  // Agregamos HttpClient para usar sus métodos
  constructor(private http: HttpClient) {}

  // Función Create
  create(data: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.url, data);
  }

  // Función Read
  read() {
    return this.http.get<Plan[]>(this.url);
  }

  // Función View
  get(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.url}/${id}`);
  }

  // Función Delete
  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}
