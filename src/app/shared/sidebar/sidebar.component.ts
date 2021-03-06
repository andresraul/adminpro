import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _sidebar: SidebarService,
               private _usuarioService: UsuarioService 
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this._usuarioService.logout();
  }

}
