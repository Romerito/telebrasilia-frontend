import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { ChamadoService } from './chamado.service';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.css']
})
export class ChamadoComponent implements OnInit {

  telebrasiliaLogado!: boolean;
  
  telebrasilia: string = "3";
 
  idEmpresa!: string;

  cnpjReceveid!: string;

  chamadoForm!: FormGroup;

  uploadForm!: FormGroup; 

  titulo!: string;

  status!: string;
  descricao!: string;
  arquivo!: string;
  listarChamado!: boolean;

  showNovoChamado: boolean = true;
  showFormChamado!: boolean;
  showFormResponder!: boolean;
  showMessageCreate!: boolean;
  showMessageRespondido!: boolean;
  showLoading!: boolean;

  files!: FileList;

  listFiles!: FileList;

  chamados!: ChamadoDTOComponent[];
  fileList!: string;
  nuProtocolo: any;
  tpChamado: any;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private chamadoService: ChamadoService) { }

  cancelar(){
    this.showFormChamado = false;
    this.showFormResponder = false;
    this.showNovoChamado = true;
    this.createForm(new ChamadoDTOComponent());
  }

  verfificarTelebrasiliaLogada(){
    if(this.telebrasilia == this.idEmpresa){
      this.telebrasiliaLogado = true;
    }else {
      this.telebrasiliaLogado = false;
    }
  }

  reponderChamado(nuProtocolo: any, tpChamado: any){
    this.tpChamado = tpChamado;
    this.nuProtocolo = nuProtocolo;
    this.listarChamado = false;
    this.showFormResponder = true;
    this.showNovoChamado = false;
    this.createForm(new ChamadoDTOComponent());
    this.showMessageCreate = false;
  }

  novoChamado(){
    this.listarChamado = false;
    this.showFormChamado = true;
    this.showNovoChamado = false;
    this.createForm(new ChamadoDTOComponent());
    this.showMessageCreate = false;
  }
  
  ngOnInit() {
    this.idEmpresa = this.chamadoService.idEmpresa;
    this.verfificarTelebrasiliaLogada();
    this.createForm(new ChamadoDTOComponent());
  }

  createForm(chamado: ChamadoDTOComponent) {
    this.chamadoForm =  this.formBuilder.group({
      tpChamado: new FormControl(chamado.tpChamado),
      dsChamado: new FormControl(chamado.dsChamado),
      noArquivo: new FormControl(chamado.noArquivo),
      stProtocolo: new FormControl(chamado.stProtocolo),
      dsProtocolo: new FormControl(chamado.dsProtocolo),
      nuProtocolo: new FormControl(chamado.nuProtocolo),
    })
  }

  
  setUploadFiles (event: Event){
    const target = event.target as HTMLInputElement;
    this.files = target.files as FileList;
  }

  criarChamado(){
    if(this.chamadoForm.value.tpChamado == '' || this.chamadoForm.value.tpChamado == null){
      this.titulo = 'Selecionar o tipo do chamado';
      return;
    }
    if(this.chamadoForm.value.dsChamado == '' || this.chamadoForm.value.dsChamado == null){
      this.descricao = 'Preencher a descrição do chamado';
      return;
    }
    
    let chamado = new ChamadoDTOComponent();
    chamado.tpChamado = this.chamadoForm.value.tpChamado;
    chamado.dsChamado = this.chamadoForm.value.dsChamado;
    chamado.noArquivo = this.chamadoForm.value.noArquivo;
    
    this.showLoading = true;
    this.chamadoService.criarChamado(this.files,chamado).subscribe(data => {
      this.showLoading = false;
      this.showMessageCreate = true;
      this.showFormChamado = false;
      this.showNovoChamado = true;
    
    },
    (e) => {
      this.showLoading = false;
    });
  
  }


  consultarChamado(){
    this.showMessageCreate = false;
    this.showLoading = true;
    this.showMessageRespondido = false;

    let chamado = new ChamadoDTOComponent();
    chamado.stProtocolo = this.chamadoForm.value.stProtocolo;
    chamado.nuProtocolo = this.chamadoForm.value.nuProtocolo;
    
    this.chamadoService.consultarChamado(chamado).subscribe(data => {
      this.chamados = data.data;
      this.files = data.files;
     
      this.showLoading = false;
      this.listarChamado = true;
    },
    (e) => {
      this.showLoading = false;
    });
  
  }

  respoderChamado(){
    if(this.chamadoForm.value.stProtocolo == '' || this.chamadoForm.value.stProtocolo == null){
      this.status = 'Selecionar o status';
      return;
    }
    if(this.chamadoForm.value.dsProtocolo == '' || this.chamadoForm.value.dsProtocolo == null){
      this.descricao = 'Preencher a descrição';
      return;
    }
    
    let chamado = new ChamadoDTOComponent();
    chamado.idEmpresa = this.idEmpresa;
    chamado.stProtocolo = this.chamadoForm.value.stProtocolo;
    chamado.dsProtocolo = this.chamadoForm.value.dsProtocolo;
    chamado.nuProtocolo = this.nuProtocolo;
    chamado.tpChamado = this.tpChamado;
    
    this.showLoading = true;
    this.chamadoService.responderChamado(chamado).subscribe(data => {
      this.showLoading = false;
      this.showMessageRespondido = true;
      this.showFormResponder = false;
      this.showNovoChamado = true;
    
    },
    (e) => {
      this.showLoading = false;
    });
  
  }


  setCleanTitulo (){
    this.titulo = '';
  }

  setCleanStProtocolo (){
    this.status = '';
  }


  setCleanDescricao (){
    this.descricao = '';
  }


}