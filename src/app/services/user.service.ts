import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  cargarUsuario(usuario: any) {
    this.userSubject = new BehaviorSubject(null);
    if (usuario) {
      this.userSubject.next(usuario);
    }
  }

  completarUsuario(){
    this.userSubject.complete();
  }

  obtenerUsuario() {
    return this.userSubject.asObservable();
  }
}
