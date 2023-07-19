import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';

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

  
   upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);

      const req = new HttpRequest('POST', `${this.apiUrl}/chamado/`, formData, {
      reportProgress: true,
      responseType: 'json'
    }); 

    return this.httpClient.request(req);
  } 
  

  public criarChamado (chamado: ChamadoDTOComponent): Observable<any>{
    chamado.idEmpresa = this.idEmpresa;
    const formData: FormData = new FormData();
    formData.append('file', chamado.noArquivo);

    const req = new HttpRequest('POST', `${this.apiUrl}/chamado/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }



 }