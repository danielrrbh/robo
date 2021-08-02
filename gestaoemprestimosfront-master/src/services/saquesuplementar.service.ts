import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { ConsultasDTO } from 'src/models/consultas.dto';
import { ConsultaEfetuadaDTO } from 'src/models/consulta_efetuada.dto';
import { EntidadesDTO } from 'src/models/entidades.dto';

@Injectable()
export class SaqueSuplementarService {

    constructor(private http: HttpClient) {}

    // tslint:disable-next-line:max-line-length
    salvarSaqueSuplementar(listaCpf: Array<string>, posicao: Number, nomeConsulta: String, tipoConsulta: String): Observable<ConsultasDTO>  {
        // tslint:disable-next-line:max-line-length
        const data = JSON.stringify({'listaCpf': listaCpf, 'posicao': posicao, 'nomeConsulta': nomeConsulta, 'tipoConsulta': tipoConsulta});
        const header = new HttpHeaders({'Content-type': 'application/json'});
        return this.http.post<ConsultasDTO>(`${API_CONFIG.baseUrl}/consultas/efetuarConsulta`, data, {headers : header});
    }

    pesquisarListaConsultaSaqueSuplementar (): Observable<ConsultasDTO[]> {
      return this.http.get<ConsultasDTO[]>(`${API_CONFIG.baseUrl}/consultas/buscarConsultas`);
    }

    pesquisarListaEntidades (): Observable<EntidadesDTO[]> {
      return this.http.get<EntidadesDTO[]>(`${API_CONFIG.baseUrl}/consultas/buscarTodasEntidades`);
    }

    downloadConsultaPorIdConsulta (idConsulta: number): Observable<ConsultaEfetuadaDTO> {
      //this.http.get<any>(`${API_CONFIG.baseUrl}/consultas/downloadArquivo/${idConsulta}`).subscribe(result=> console.log(result))
      return this.http.get<ConsultaEfetuadaDTO>(`${API_CONFIG.baseUrl}/consultas/downloadArquivo/${idConsulta}`);
    }

    refazerConsultaPorId (idConsulta: number): Observable<ConsultaEfetuadaDTO> {
      return this.http.get<ConsultaEfetuadaDTO>(`${API_CONFIG.baseUrl}/consultas/refazerConsultaPorId/${idConsulta}`);
    }

    excluirConsultaPorId (idConsulta: number): Observable<ConsultaEfetuadaDTO> {
      return this.http.get<ConsultaEfetuadaDTO>(`${API_CONFIG.baseUrl}/consultas/apagarConsultaPorId/${idConsulta}`);
    }

    buscarQuantConsultasPorUsuarioDia (emailUsuarios: string): Observable<number> {
      return this.http.get<number>(`${API_CONFIG.baseUrl}/consultas/buscarQuantConsultasPorUsuarioDia/${emailUsuarios}`);
    }
}
