import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  apiUrl = "http://localhost:8080/api";

  idEmpresa!: string;

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    reportProgress: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'data',
      responseType: 'json'
    }),
  };

  
  criarChamado(file: FileList, chamado: ChamadoDTOComponent): Observable<HttpEvent<any>> {
    chamado.idEmpresa = this.idEmpresa;
    const formData: FormData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append('files', file[index]);
    }

      formData.append('tpChamado', chamado.tpChamado);
      formData.append('dsChamado', chamado.dsChamado);
      formData.append('idEmpresa', chamado.idEmpresa);


    const req = new HttpRequest('POST', `${this.apiUrl}/chamado/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  } 
  

/*   public criarChamado (chamado: ChamadoDTOComponent): Observable<any>{
    chamado.idEmpresa = this.idEmpresa;
    const formData: FormData = new FormData();

    const req = new HttpRequest('POST', `${this.apiUrl}/chamado/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  } */



 }