// SharedClientsService
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedClientsService {
  private _clientCreatedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Observable para suscribirse a los mensajes de cliente creado
  clientCreated$ = this._clientCreatedSubject.asObservable();

  // Método para emitir un mensaje de cliente creado con el estado de addEditable
  emitClientCreated(addEditable: boolean): void {
    this._clientCreatedSubject.next({ addEditable });
  }
}
