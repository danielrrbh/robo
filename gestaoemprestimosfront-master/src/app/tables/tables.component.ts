import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SaqueSuplementarService } from 'src/services/saquesuplementar.service';
import { ConsultasDTO } from 'src/models/consultas.dto';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { AuthService } from 'src/services/auth.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {


    btDisabled: Boolean;
    btDefazerdownloadDisabled: Boolean;
    btApagarDisabled: Boolean;

    constructor(private saqueSuplementarService: SaqueSuplementarService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
        private authService: AuthService ) {
        setInterval(() => this.reloadPage(), 10000);
     }

    @Input()
    set novaConsulta(novaConsulta: ConsultasDTO) {
        if (novaConsulta !== undefined && novaConsulta != null) {
            this.reloadPage();
         }
    }
    displayedColumns = ['idConsulta', 'nomeConsulta', 'tipoConsulta', 'dataConsulta', 'quantConsulta', 'porcentagemConsulta',
                        'statusConsulta', 'downloadConsulta'];
    dataSource: MatTableDataSource<ConsultasDTO>;

    @ViewChild(MatSort) sort: MatSort;
    ngOnInit() {
        this.authService.refreshToken().subscribe(resp => {
            this.authService.successfulLogin(resp.headers.get('Authorization'));
            this.saqueSuplementarService.pesquisarListaConsultaSaqueSuplementar().subscribe(response => {
                const dateP = this.datePipe;
                response.forEach(function (value) {
                    if (value.dataConsultas != null) {
                        value.dataConsultas = dateP.transform(value.dataConsultas, 'dd/MM/yyyy HH:mm:ss');
                        if ( value.statusConsulta === 'C' ) {
                            value.statusConsulta = 'Fila';
                        } else if (value.statusConsulta === 'G') {
                            value.statusConsulta = 'Gerando';
                        } else if (value.statusConsulta = 'F') {
                            value.statusConsulta = 'Finalizado';
                        }
                    }
                });
                this.dataSource = new MatTableDataSource(response);
                this.dataSource.sort = this.sort;
            },
            error => {});
        },
        error => {});
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    downloadConsulta(idConsulta: number) {
        this.saqueSuplementarService.downloadConsultaPorIdConsulta(idConsulta)
        .subscribe(response => {
        const blob = new Blob([atob(response.base64File)], { type: 'text/csv' });
         saveAs(blob, response.nomeConsulta);
        });
    }

    refazerConsulta(element: ConsultasDTO) {
        this.saqueSuplementarService.refazerConsultaPorId(element.idConsultas)
        .subscribe(response => {
            this.openDialog('200', 'Refazer Consulta', 'A consulta ' + element.idConsultas + ' voltou para a fila de pesquisa.');
            this.ngOnInit();
        });
    }

    apagarConsulta(element: ConsultasDTO) {
        this.dataSource.data = this.dataSource.data.filter(i => i !== element);
        this.saqueSuplementarService.excluirConsultaPorId(element.idConsultas)
        .subscribe(response => {
            this.openDialog('200', 'Consulta Excluída', 'Consulta ' + element.idConsultas + ' excluída com sucesso');
            this.ngOnInit();
        });
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
