import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.css']
})
export class ChamadoComponent implements OnInit {
  title = 'Chamado';
  chamadoForm!: FormGroup;

  titulo!: string;
  descricao!: string;
  arquivo!: string;
  listarChamado!: boolean;

  showNovoChamado: boolean = true;
  showFormChamado!: boolean;
  showMessageCreate!: boolean;

  
  constructor(private formBuilder: FormBuilder, private router: Router) { }

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
   // this.router.navigate(['/chamado']);
  }
  
  createForm(chamado: ChamadoDTOComponent) {
    this.chamadoForm =  this.formBuilder.group({
      titulo: new FormControl(chamado.titulo),
      descricao: new FormControl(chamado.descricao),
      arquivo: new FormControl(chamado.arquivo),
    })
  }

  onSubmit(){
    if(this.chamadoForm.value.titulo == '' || this.chamadoForm.value.titulo == null){
      this.titulo = 'Selecionar o tipo do chamado';
      return;
    }
    if(this.chamadoForm.value.descricao == '' || this.chamadoForm.value.descricao == null){
      this.descricao = 'Preencher a descrição do chamado';
      return;
    }
    this.showFormChamado = false;
    this.showNovoChamado = true;
    this.showMessageCreate = true;
    console.log(this.chamadoForm.value.title)
    
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
