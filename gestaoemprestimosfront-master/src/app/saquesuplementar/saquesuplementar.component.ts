import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SaqueSuplementarService } from 'src/services/saquesuplementar.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { ConsultasDTO } from 'src/models/consultas.dto';
import { EntidadesDTO } from 'src/models/entidades.dto';
import { StorageService } from 'src/services/storage.service';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material';
import { UsuariosService } from 'src/services/usuarios.service';
import { isNumber } from 'util';

@Component({
    selector: 'app-saquesuplementar',
    templateUrl: './saquesuplementar.component.html',
    styleUrls: ['./saquesuplementar.component.scss']
})
export class SaqueSuplementarComponent implements OnInit {
    listaCpf = new FormControl();
    tipoConsulta = new FormControl();
    retorno: HttpResponse<string>;
    nvConsulta: ConsultasDTO;
    posicao = new FormControl();
    listaEntidades: EntidadesDTO[];
    nomeConsulta = new FormControl();
    countLinhas: number;
    perfilUsuario: string;

    constructor(
        private saqueSuplementarService: SaqueSuplementarService,
        private authService: AuthService,
        private router: Router,
        private storageService: StorageService,
        private dialog: MatDialog,
        private usuarioService: UsuariosService ) {}

    ngOnInit() {
        this.storageService.getLocalStorage();
        this.perfilUsuario = localStorage.getItem('pUser');
        this.authService.refreshToken().subscribe(response => {
            this.authService.successfulLogin(response.headers.get('Authorization'));
            this.countLinhas = 0;
            this.getPerfilUsuario();
            this.saqueSuplementarService.pesquisarListaEntidades().subscribe(responseEntidades => {
                this.listaEntidades = responseEntidades;
                this.posicao.setValue(-1);
                this.tipoConsulta.setValue('S');
            },
            error => {});

        },
        error => {
            this.router.navigate(['/login']);
        });
    }

    pesquisarSaqueSuplementar() {
        if (this.nomeConsulta.value == null || this.nomeConsulta.value === '') {
            this.openDialog('400', 'Dados Inválidos', 'Cadastre o nome da Consulta.');
            return false;
        }
        if ((this.listaCpf.value == null || this.listaCpf.value.length < 11)) {
            this.openDialog('400', 'Dados Inválidos', 'Cadastre pelo menos um CPF.');
            return false;
        }
        if ((this.posicao.value == null || this.posicao.value === -1)) {
            this.openDialog('400', 'Dados Inválidos', 'Selecione um orgão.');
            return false;
        }
        if ((this.tipoConsulta.value == null || this.tipoConsulta.value === -1)) {
            this.openDialog('400', 'Dados Inválidos', 'Selecione o tipo de Consulta.');
            return false;
        }
        this.storageService.getLocalStorage();
        if ( this.perfilUsuario === '2' ) {
            const user = JSON.parse(localStorage.getItem('localUser'));
             // tslint:disable-next-line:max-line-length
            this.saqueSuplementarService.buscarQuantConsultasPorUsuarioDia(user.email).subscribe(response => {
                if ( response >= 2 ) {
                    this.openDialog('400', 'Dados Inválidos', 'Voce excedeu o limite de 2 pesquisas diárias.');
                    return false;
                } else {
                    const listaCpfLimpa = this.limparListaCpf(this.listaCpf.value);
                        // tslint:disable-next-line:max-line-length
                        this.saqueSuplementarService.salvarSaqueSuplementar(listaCpfLimpa, this.posicao.value, this.nomeConsulta.value, this.tipoConsulta.value).subscribe(response => {
                        this.nvConsulta = response;
                        this.listaCpf.setValue('');
                        this.nomeConsulta.setValue('');
                        this.posicao.setValue(-1);
                        this.countLinhas = 0;
                        this.tipoConsulta.setValue('S');
                    },
                    error => {});
                }
            },
            error => {});
        } else {
            const listaCpfLimpa = this.limparListaCpf(this.listaCpf.value);
            // tslint:disable-next-line:max-line-length
            this.saqueSuplementarService.salvarSaqueSuplementar(listaCpfLimpa, this.posicao.value, this.nomeConsulta.value, this.tipoConsulta.value).subscribe(response => {
                this.nvConsulta = response;
                this.listaCpf.setValue('');
                this.nomeConsulta.setValue('');
                this.posicao.setValue(-1);
                this.tipoConsulta.setValue('S');
           },
           error => {});
        }
    }

    private limparListaCpf(listaCpf: string) {
        const cpfList = listaCpf.split('\n');
        const listaCpfLimpa = new Array<string>();
        cpfList.forEach(el => {
          const cpfValido = el.replace(/[\.-]/g, '');
           if (cpfValido.length === 11 && !isNaN(Number(cpfValido))) {
               listaCpfLimpa.push(cpfValido);
           }
        });
        return listaCpfLimpa;
    }

    onPaste(event: ClipboardEvent) {
        const clipboardData = event.clipboardData;
        const pastedText = clipboardData.getData('text');
        this.countLinhas = pastedText.split('\n').length;
        this.storageService.getLocalStorage();
        if ( this.perfilUsuario === '2' ) {
           if (this.countLinhas > 1000) {
               this.listaCpf.setValue('');
               this.countLinhas = 0;
               this.openDialog('400', 'Dados Inválidos', 'Limite excedido! Cadastre no máximo 1000 CPFs.');
            }
        } else if ( this.perfilUsuario === '1' ) {
            if (this.countLinhas > 30000) {
                this.listaCpf.setValue('');
                this.countLinhas = 0;
                this.openDialog('400', 'Dados Inválidos', 'Limite excedido! Cadastre no máximo 30000 CPFs.');
             }
        }
    }

    contarLinhasTextArea(event) {
        if (event.listaCpf.value != null) {
            this.countLinhas = event.listaCpf.value.split('\n').length;
        } else {
            this.countLinhas = 0;
        }
        this.storageService.getLocalStorage();
        if ( this.perfilUsuario === '2' ) {
           if (this.countLinhas > 1000) {
               this.listaCpf.setValue('');
               this.countLinhas = 0;
               this.openDialog('400', 'Dados Inválidos', 'Limite excedido! Cadastre no máximo 1000 CPFs.');
            }
        } else if ( this.perfilUsuario === '1' ) {
            if (this.countLinhas > 30000) {
                this.listaCpf.setValue('');
                this.countLinhas = 0;
                this.openDialog('400', 'Dados Inválidos', 'Limite excedido! Cadastre no máximo 30000 CPFs.');
             }
        }
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

       getPerfilUsuario () {
        this.usuarioService.buscarPerfilUsuarioLogado().subscribe(response => {
            this.perfilUsuario = response.codPerfil.toString();
        },
        error => {});
    }
}
