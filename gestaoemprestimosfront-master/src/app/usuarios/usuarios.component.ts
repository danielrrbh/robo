import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuariosDTO } from 'src/models/usuarios.dto';
import { UsuariosService } from 'src/services/usuarios.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { PerfilDTO } from 'src/models/perfil.dto';
import { PasswordDTO } from 'src/models/password.dto';
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

    nvUsuario: PasswordDTO;
    idUsuarios = new FormControl();
    cpfCnpjUsuarios = new FormControl();
    nomeUsuarios = new FormControl();
    emailUsuarios = new FormControl();
    tipoUsuarios = new FormControl();
    statusUsuarios = new FormControl();
    perfilUsuarios = new FormControl();
    cpfMask: string;
    titleCpfCnpj: string;
    titleNomeRazao: string;
    editar: boolean;

    tipoUsuariosList: string[] = ['CPF', 'Cnpj'];
    listaPerfil: PerfilDTO[] = [{ 'codPerfil': 1 , 'nomePerfil': 'Administrador'},
                                    { 'codPerfil': 2, 'nomePerfil': 'Atendente'}
                                   ];

    position = new FormControl(this.listaPerfil[0]);

    constructor( private usuariosService: UsuariosService,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog) {}

    ngOnInit() {
        this.authService.refreshToken().subscribe(response => {
            this.authService.successfulLogin(response.headers.get('Authorization'));
            this.cpfMask = '000.000.000-00';
            this.titleCpfCnpj = 'Cpf';
            this.titleNomeRazao = 'Nome';
            this.tipoUsuarios.setValue('CPF');
            this.editar = false;
          },
          error => {
            this.router.navigate(['/login']);
          });
    }

    inserirEditarUsuario() {
        if (this.cpfCnpjUsuarios.value == null || this.cpfCnpjUsuarios.value === undefined
            || this.nomeUsuarios.value == null || this.nomeUsuarios.value === undefined
            || this.emailUsuarios.value == null || this.emailUsuarios.value === undefined
            || this.perfilUsuarios.value == null || this.perfilUsuarios.value === -1
            ) {
                this.openDialog('400', 'Dados Inválidos', 'Todos os campos são obrigatórios. Preencha todos.');
            return false;
        }
        // tslint:disable-next-line:max-line-length
        const usuarioObject = this.montaUsuario(this.idUsuarios.value, this.emailUsuarios.value, this.nomeUsuarios.value, this.tipoUsuarios.value, this.cpfCnpjUsuarios.value, this.statusUsuarios.value, this.perfilUsuarios.value);
        this.usuariosService.inserirEditarUsuario(usuarioObject).subscribe(response => {
            this.nvUsuario = response;
            this.cpfMask = '000.000.000-00';
            this.titleCpfCnpj = 'Cpf';
            this.titleNomeRazao = 'Nome';
            this.editar = false;
            this.idUsuarios.setValue(null);
            this.cpfCnpjUsuarios.setValue(null);
            this.nomeUsuarios.setValue(null);
            this.emailUsuarios.setValue(null);
            this.tipoUsuarios.setValue('CPF');
            this.statusUsuarios.setValue('');
            this.perfilUsuarios.setValue(-1);
            // tslint:disable-next-line:max-line-length
            this.openDialog('200', 'Usuário criado/editado com sucesso',
                            'Login: ' + this.nvUsuario.loginUsuario + '<br /> Senha: ' + this.nvUsuario.pass);
        },
        error => {});
    }

    montaUsuario(idUsuarios: number, emailUsuarios: string,
        nomeUsuarios: string, tipoUsuarios: string, cpfCnpjUsuarios: string, statusUsuarios: string, perfilUsuarios: string) {
        const usuario = new UsuariosDTO();
        usuario.idUsuarios = idUsuarios;
        usuario.emailUsuarios = emailUsuarios;
        usuario.nomeUsuarios = nomeUsuarios;
        usuario.tipoUsuarios = tipoUsuarios === 'CPF' ? 1 : 2;
        usuario.cpfCnpjUsuarios = cpfCnpjUsuarios;
        usuario.statusUsuarios = statusUsuarios != null ? statusUsuarios : 'A';
        usuario.perfil = perfilUsuarios;
        return usuario;
    }

   changeMask(event) {
    this.cpfCnpjUsuarios.setValue('');
       if ( event.value === 'CNPJ') {
           this.cpfMask = '00.000.000/0000-00';
           this.titleCpfCnpj = 'Cnpj';
           this.titleNomeRazao = 'Razão Social';
       } else {
           this.cpfMask = '000.000.000-00';
           this.titleCpfCnpj = 'Cpf';
           this.titleNomeRazao = 'Nome';
       }
   }

   povoarFormulario(event) {
       if ( event.tipoUsuarios === 'Pessoa Física' ) {
           this.cpfMask = '000.000.000-00';
           this.titleCpfCnpj = 'Cpf';
           this.titleNomeRazao = 'Nome';
           this.tipoUsuarios.setValue('CPF');
       } else {
        this.cpfMask = '00.000.000/000-00';
        this.titleCpfCnpj = 'Cnpj';
        this.titleNomeRazao = 'Razão Social';
        this.tipoUsuarios.setValue('CNPJ');
       }
       this.idUsuarios.setValue(event.idUsuarios);
       this.cpfCnpjUsuarios.setValue(event.cpfCnpjUsuarios);
       this.nomeUsuarios.setValue(event.nomeUsuarios);
       this.emailUsuarios.setValue(event.emailUsuarios);
       this.statusUsuarios.setValue('A');
       this.perfilUsuarios.setValue(event.perfil);
       this.editar = true;
   }

   limparFormulario() {
        this.idUsuarios.setValue(null);
        this.cpfCnpjUsuarios.setValue(null);
        this.nomeUsuarios.setValue(null);
        this.emailUsuarios.setValue(null);
        this.tipoUsuarios.setValue('CPF');
        this.statusUsuarios.setValue('');
        this.perfilUsuarios.setValue(-1);
        this.cpfMask = '000.000.000-00';
        this.titleCpfCnpj = 'Cpf';
        this.titleNomeRazao = 'Nome';
        this.editar = false;
   }

   openDialog(status, error, message) {
    this.dialog.open(DialogOverviewComponent, {
        width: '350px',
        data: {
               titulo: status + ' - ' + error,
               texto: message
              }
    });
   }
}
