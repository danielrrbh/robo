import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { UsuariosDTO } from 'src/models/usuarios.dto';
import { StatusUsuarioDTO } from 'src/models/status_usuario.dto';
import { PasswordDTO } from 'src/models/password.dto';
import { EmailDTO } from 'src/models/email.dto';
import { PerfilDTO } from 'src/models/perfil.dto';

@Injectable()
export class UsuariosService {

    constructor(private http: HttpClient) {}

    inserirEditarUsuario(usuario: UsuariosDTO): Observable<PasswordDTO>  {
      if (usuario.idUsuarios === null) {
        console.log('Criar' + usuario);
          return this.http.post<PasswordDTO>(`${API_CONFIG.baseUrl}/usuarios`, usuario);
      } else {
        console.log('Editar' + usuario);
        return this.http.put<PasswordDTO>(`${API_CONFIG.baseUrl}/usuarios`, usuario);
      }
    }

    pesquisarListaUsuarios (): Observable<UsuariosDTO[]> {
      return this.http.get<UsuariosDTO[]>(`${API_CONFIG.baseUrl}/usuarios`);
    }

    alterarStatusUsuario (statusUsuario: StatusUsuarioDTO): Observable<StatusUsuarioDTO> {
        return this.http.post<StatusUsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/alterarStatusUsuario`, statusUsuario);
    }

    buscarUsuarioPorId (idUsuario: number): Observable<UsuariosDTO> {
      return this.http.get<UsuariosDTO>(`${API_CONFIG.baseUrl}/usuarios/${idUsuario}`);
    }

    buscarPerfilUsuarioLogado() {
      return this.http.get<PerfilDTO>(`${API_CONFIG.baseUrl}/usuarios/perfil`);
    }

    esqueciSenha(email: EmailDTO): Observable<PasswordDTO> {
      return this.http.post<PasswordDTO>(`${API_CONFIG.baseUrl}/auth/esqueci_senha`, email);
    }
}





