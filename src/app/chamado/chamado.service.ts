import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { empresaDadosadDTOcomponent } from '../dtos/empresaDadosadDTO.component';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  apiUrl = "http://localhost:8089/api";
  //apiUrl = "http://45.7.5.18:8089/api";

  idEmpresa!: string;

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'data'
    }),
  };


  public consultarEmpresaDadosad(): Observable<any>{
    return this.httpClient.get<empresaDadosadDTOcomponent>(this.apiUrl + "/empresadadosad/" + this.idEmpresa, this.httpOptions);
  }

  public criar(file: FileList, chamado: ChamadoDTOComponent): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    if (file != null) {
      for (let index = 0; index < file.length; index++) {
        formData.append('files', file[index]);
      }
    } else {
      let noFiles = new File(["content"], "noFiles.jpg")
      formData.append('files', noFiles);
    }

    formData.append('tpChamado', chamado.tpChamado);
    formData.append('dsChamado', chamado.dsChamado);
    formData.append('idEmpresa', this.idEmpresa);
    
    if (chamado.noArquivo != null) {
      formData.append('noArquivo', chamado.noArquivo);
    } else {
      formData.append('noArquivo','noFiles');
    }

    
    formData.append('idEmprad', chamado.idEmprad);

    return this.httpClient.post<any>(this.apiUrl + "/chamado-anexo/", formData);
  }

  public responderChamado(chamado: ChamadoDTOComponent): Observable<any>{
    return this.httpClient.post<ChamadoDTOComponent>(this.apiUrl + "/responder/", chamado, this.httpOptions);
  }

  public responder(file: FileList, chamado: ChamadoDTOComponent): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    
    if (file != null) {
      for (let index = 0; index < file.length; index++) {
        formData.append('files', file[index]);
      }
    } else {
      let noFiles = new File(["content"], "noFiles.jpg")
      formData.append('files', noFiles);
    }

    formData.append('tpChamado', chamado.tpChamado);
    formData.append('dsChamado', chamado.dsChamado);
    formData.append('idEmpresa', this.idEmpresa);
    formData.append('nuProtocolo', chamado.nuProtocolo);
    formData.append('stProtocolo', chamado.stProtocolo);
    formData.append('scChamado', chamado.scChamado);
    formData.append('idChamado', chamado.idChamado);
    formData.append('idEmprad', chamado.idEmprad);
    
    if (chamado.noArquivo != null) {
      formData.append('noArquivo', chamado.noArquivo);
    } else {
      formData.append('noArquivo','noFiles');
    }

    return this.httpClient.post<any>(this.apiUrl + "/responder-anexo/", formData);
  }

  public consultarChamado(chamado: ChamadoDTOComponent): Observable<any>{
    chamado.idEmpresa = this.idEmpresa;
    return this.httpClient.post<ChamadoDTOComponent>(this.apiUrl + "/chamados/", chamado, this.httpOptions);
  }

  public carregarArquivo(noArquivo: string, nuProtocolo: string): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/file/${nuProtocolo}/${noArquivo}`, {
      responseType: 'blob'
    });
  }

 }
