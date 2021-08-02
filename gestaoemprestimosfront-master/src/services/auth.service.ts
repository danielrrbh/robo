import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/crendeciais.dto';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    credenciais: CredenciaisDTO = {
        emailUsuarios: '',
        senhaUsuarios: ''
      };

    constructor(private http: HttpClient, private storageService: StorageService, private usuariosService: UsuariosService) {}

    authenticate(emailUsuario, senhaUsuario) {
        this.credenciais.emailUsuarios = emailUsuario.value;
        this.credenciais.senhaUsuarios = senhaUsuario.value;
        return this.http.post(`${API_CONFIG.baseUrl}/login`, this.credenciais, {observe: 'response', responseType: 'text'});
    }

    refreshToken () {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {observe: 'response', responseType: 'text'});
    }

    successfulLogin (authValue: string) {
        const tok = authValue.substring(7);
        const user: LocalUser = {
            token : tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storageService.setLocalStorage(user);
        localStorage.setItem('isLoggedin', 'true');
    }

    logout () {
        console.log('saiu');
       this.storageService.setLocalStorage(null);
       localStorage.clear();
    }
}
