import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  apiUrl = "/api";

  idEmpresa!: string;

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'data'
    }),
  };


  public criarChamado (chamado: ChamadoDTOComponent): Observable<any>{
    chamado.idEmpresa = this.idEmpresa;
    return this.httpClient.post<ChamadoDTOComponent>(this.apiUrl + "/chamado/", chamado, this.httpOptions);
  }
 }