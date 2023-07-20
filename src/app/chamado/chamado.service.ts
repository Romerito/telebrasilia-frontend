import { HttpClient, HttpEvent } from '@angular/common/http';
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

  public criarChamado (file: FileList, chamado: ChamadoDTOComponent): Observable<HttpEvent<any>> {
    chamado.idEmpresa = this.idEmpresa;
    const formData: FormData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append('files', file[index]);
    }

      formData.append('tpChamado', chamado.tpChamado);
      formData.append('dsChamado', chamado.dsChamado);
      formData.append('idEmpresa', chamado.idEmpresa);

      return this.httpClient.post<any>(this.apiUrl + "/chamado/", formData,);

  }
  

 }