import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  recuerdame = false;

  auth2: any;

  constructor( private router: Router,
               private usuarioService: UsuarioService,
               private ngZone: NgZone
               ) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '378601440161-j0iii1hrm6n3nei7q70rulp2a9lma65l.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {
  
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle( token )
      .subscribe( resp => {
        this.ngZone.run(() => this.router.navigate(['/dashboard']) );
      });

    });

  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario: Usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this.usuarioService.login( usuario, forma.value.recuerdame )
    .subscribe( correcto => this.router.navigate(['/dashboard']) );
    console.log(forma.value);

    // this.router.navigate(['/dashboard']);

  }

}
