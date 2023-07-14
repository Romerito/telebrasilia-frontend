import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  apiUrl = "/api";


  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'data'
    }),
  };

  public criarChamado (chamado: ChamadoDTOComponent): Observable<any>{
    return this.httpClient.post<ChamadoDTOComponent>(this.apiUrl + "/chamado/", chamado, this.httpOptions);
  }
 }