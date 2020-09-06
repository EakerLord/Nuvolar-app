import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { UserService } from '../../services/user.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  buscarusuario = this.fb.group({
    nombreUsuario: [ '', []]
  });
  usuarios = [];
  usuariosMostrados = [];
  showSpinner = false;
  noUsers = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private github: GithubService,
    private userService: UserService,
    private spinner: SpinnerService
  ){}

  ngOnInit() {
    this.spinner.spinnerObservable()
    .subscribe( res => {
      this.showSpinner = res;
    });
    // Mostrar spenner
    this.spinner.showSpinner();

    this.github.getData()
    .subscribe(data => {
      this.usuarios = this.usuariosMostrados = data;
      // Ocultar spenner
      this.spinner.hideSpinner();
    });
  }

  buscarUsuario(){
    const usuarioBuscado = this.buscarusuario.get('nombreUsuario').value;
    this.usuariosMostrados = this.usuarios;
    const usuariosFiltrados = [];

    this.usuarios.forEach(usuario => {
      if ( usuario.login.includes(usuarioBuscado.toLowerCase())){
        usuariosFiltrados.push(usuario);
      }
    });
    this.usuariosMostrados = usuariosFiltrados;
    if (this.usuariosMostrados.length === 0) {
      this.noUsers = true;
    } else {
      this.noUsers = false;
    }
  }

  mirarDetalle( usuario: any ){
    this.userService.cargarUsuario(usuario);
    this.router.navigate(['detalle']);
    // this.router.navigate(['detalle'], { queryParams: { user: JSON.stringify(usuario) } });
  }
}
