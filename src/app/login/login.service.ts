import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaDTO } from '../dtos/empresaDTO.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = "/api";


  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'data'
    }),
  };

  public getEmpresa (cnpj: EmpresaDTO): Observable<any>{
    return this.httpClient.post<EmpresaDTO>(this.apiUrl + "/empresa/", JSON.stringify(cnpj), this.httpOptions);
    
  }
}
