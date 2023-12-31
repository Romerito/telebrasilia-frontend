import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  apiUrl = "http://45.7.5.18:8089/api";

  idEmpresa!: string;

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'data'
    }),
  };


  
  public criarChamadoSemArquivo(chamado: ChamadoDTOComponent): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('tpChamado', chamado.tpChamado);
    formData.append('dsChamado', chamado.dsChamado);
    formData.append('idEmpresa', this.idEmpresa);

    return this.httpClient.post<any>(this.apiUrl + "/chamado/", formData);
  }

  public criarChamado(file: FileList, chamado: ChamadoDTOComponent): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append('files', file[index]);
    }

    formData.append('tpChamado', chamado.tpChamado);
    formData.append('dsChamado', chamado.dsChamado);
    formData.append('idEmpresa', this.idEmpresa);
    formData.append('noArquivo', chamado.noArquivo);

    return this.httpClient.post<any>(this.apiUrl + "/chamado-anexo/", formData);
  }

  public responderChamado(chamado: ChamadoDTOComponent): Observable<any>{
    return this.httpClient.post<ChamadoDTOComponent>(this.apiUrl + "/responder/", chamado, this.httpOptions);
  }
  
  public consultarChamado(chamado: ChamadoDTOComponent): Observable<any>{
    chamado.idEmpresa = this.idEmpresa;
    return this.httpClient.post<ChamadoDTOComponent>(this.apiUrl + "/chamados/", chamado, this.httpOptions);
  }

  public charregarArquivo(noArquivo: string, nuProtocolo: string): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/file/${nuProtocolo}/${noArquivo}`, {
      responseType: 'blob'
    });
  }

 }
