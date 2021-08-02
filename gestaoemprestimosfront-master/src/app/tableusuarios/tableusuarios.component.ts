import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UsuariosService } from 'src/services/usuarios.service';
import { UsuariosDTO } from 'src/models/usuarios.dto';
import { StatusUsuarioDTO } from 'src/models/status_usuario.dto';
import { EmailDTO } from 'src/models/email.dto';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

@Component({
    selector: 'app-table-usuarios',
    templateUrl: './tableusuarios.component.html',
    styleUrls: ['./tableusuarios.component.scss']
})
export class TableUsuariosComponent implements OnInit {


    @Output() change = new EventEmitter();

    statusUsuario = new StatusUsuarioDTO();
    email = new EmailDTO();
    displayedColumns = ['cpfCnpjUsuarios', 'nomeUsuarios', 'emailUsuarios', 'perfil', 'atInUsuarios'];
    dataSource: MatTableDataSource<UsuariosDTO>;


    constructor(private usuariosService: UsuariosService, private dialog: MatDialog) { }

    @Input()
    set novoUsuario(novoUsuario: UsuariosDTO) {
        this.reloadPage();
    }

    @ViewChild(MatSort) sort: MatSort;
    ngOnInit() {
        this.usuariosService.pesquisarListaUsuarios().subscribe(response => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.sort = this.sort;
          },
          error => {});
    }

    // applyFilter(filterValue: string) {
    //     filterValue = filterValue.trim(); // Remove whitespace
    //     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //     this.dataSource.filter = filterValue;
    // }

    ativaInativaUsuario(idUsuario: number, event: any) {
        this.statusUsuario.checked = event.checked === true ? 'A' : 'I';
        this.statusUsuario.idUsuario = idUsuario;
        const statusUsuario = event.checked === true ? 'Ativado' : 'Inativado';
        this.usuariosService.alterarStatusUsuario(this.statusUsuario).subscribe(response => {
            this.openDialog('200', 'Status Alterado', 'Usuário ' + idUsuario + ' ' + statusUsuario + ' com sucesso!');
            this.reloadPage();
        },
        error => {
            this.openDialog('500', 'Erro de Servidor', 'Ocorreu um erro ao ativar/inativar o usuario.');
        });
    }

    esqueciSenha(emailUsuario: string) {
        this.email.email = emailUsuario;
        this.usuariosService.esqueciSenha(this.email).subscribe(response => {
            this.openDialog('200', 'Senha atualizada com sucesso', 'Login: ' + emailUsuario + '<br /> Senha: ' + response.pass);
            this.reloadPage();
        },
        error => {
            this.openDialog('500', 'Erro de Servidor', 'Ocorreu um erro gerar nova senha para o usuario.');
        });
    }

    apagarUsuario (idUsuario: number) {
        this.statusUsuario.checked = 'E';
        this.statusUsuario.idUsuario = idUsuario;
        this.usuariosService.alterarStatusUsuario(this.statusUsuario).subscribe(response => {
            this.openDialog('200', 'Exclusão de Usuário', 'Usuário ' + idUsuario + ' apagado com sucesso.');
            this.reloadPage();
        },
        error => {
            this.openDialog('500', 'Erro de Servidor', 'Ocorreu um erro ao apagar o usuario.');
        });
    }

    editarUsuario(usuarioDTO: UsuariosDTO) {
        if ( usuarioDTO.statusUsuarios !== 'A' ) {
            this.openDialog('400', 'Edição não permitida', 'Somente é permitido alterar usuário com status de Ativo!');
        } else {
            this.change.emit(usuarioDTO);
        }

        // this.change = usuarioDTO;
    }

    reloadPage () {
        this.ngOnInit();
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
