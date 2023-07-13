import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaDTO } from '../dtos/empresaDTO.component';
import { Observable } from 'rxjs';
import { LoginDTOComponent } from '../dtos/loginDTO.component';

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

  public getEmpresa (cnpj: string): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("cnpj", cnpj);
    return this.httpClient.get<EmpresaDTO>(this.apiUrl + "/empresa/", {params:queryParams});
  }

  public getLogin (login: LoginDTOComponent): Observable<any>{
    return this.httpClient.post<LoginDTOComponent>(this.apiUrl + "/login/", login, this.httpOptions);
  }
}
