import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { UsuariosService } from 'src/services/usuarios.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

        emailUsuarios = new FormControl();
        senhaUsuarios = new FormControl();

    constructor(private router: Router, private authService: AuthService, private usuarioService: UsuariosService) {}

    ngOnInit() {
    }

    onLogin() {
        this.authService.authenticate(this.emailUsuarios, this.senhaUsuarios).subscribe(response => {
            this.authService.successfulLogin(response.headers.get('Authorization'));
            this.usuarioService.buscarPerfilUsuarioLogado().subscribe(response => {
                if ( response.codPerfil.toString() === '2') {
                    this.router.navigate(['/saquesuplementar']);
                } else {
                    this.router.navigate(['/usuarios']);
                }
            },
            error => {});
          },
          error => {});
    }
}

