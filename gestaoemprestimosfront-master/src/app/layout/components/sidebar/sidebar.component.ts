import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { UsuariosService } from 'src/services/usuarios.service';
import { PerfilDTO } from 'src/models/perfil.dto';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    public perfil: PerfilDTO;
    public codPerfil: number;

    constructor(private storageService: StorageService, private usuarioService: UsuariosService) {}

    ngOnInit() {
        this.getPerfilUsuario ();
        this.showMenu = '';
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    getPerfilUsuario () {
        this.usuarioService.buscarPerfilUsuarioLogado().subscribe(response => {
            this.perfil = response;
            this.codPerfil = this.perfil.codPerfil;
            this.storageService.getLocalStorage();
            localStorage.setItem('pUser', this.codPerfil.toString());
        },
        error => {});
    }
}
