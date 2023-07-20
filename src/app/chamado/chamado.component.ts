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
  
  cnpjReceveid!: string;

  chamadoForm!: FormGroup;

  uploadForm!: FormGroup; 

  titulo!: string;
  descricao!: string;
  arquivo!: string;
  listarChamado!: boolean;

  showNovoChamado: boolean = true;
  showFormChamado!: boolean;
  showMessageCreate!: boolean;
  showLoading!: boolean;

  files!: FileList;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private chamadoService: ChamadoService) { }

  cancelarChamado(){
    this.showFormChamado = false;
    this.showNovoChamado = true;
    this.createForm(new ChamadoDTOComponent());
  }

  novoChamado(){
    this.listarChamado = false;
    this.showFormChamado = true;
    this.showNovoChamado = false;
    this.createForm(new ChamadoDTOComponent());
    this.showMessageCreate = false;
  }
  
  ngOnInit() {
    this.createForm(new ChamadoDTOComponent());
  }


  
  createForm(chamado: ChamadoDTOComponent) {
    this.chamadoForm =  this.formBuilder.group({
      tpChamado: new FormControl(chamado.tpChamado),
      dsChamado: new FormControl(chamado.dsChamado),
      noArquivo: new FormControl(chamado.noArquivo),
    })
  }

  
  setUploadFiles (event: Event){
    const target = event.target as HTMLInputElement;
    this.files = target.files as FileList;
  }

  onSubmit(){
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


  onConsultar(){
    this.showMessageCreate = false;
    this.listarChamado = true;
  }

  setCleanTitulo (){
    this.titulo = '';
  }

  setCleanDescricao (){
    this.descricao = '';
  }


}