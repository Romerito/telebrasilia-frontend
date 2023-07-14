import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { Router } from '@angular/router';
import { ChamadoService } from './chamado.service';

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

  chamadoRecebido!: ChamadoDTOComponent;
  
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
   // this.router.navigate(['/chamado']);
  }
  
  createForm(chamado: ChamadoDTOComponent) {
    this.chamadoForm =  this.formBuilder.group({
      tpChamado: new FormControl(chamado.tpChamado),
      dsChamado: new FormControl(chamado.dsChamado),
      noArquivo: new FormControl(chamado.noArquivo),
    })
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
    chamado.idEmpresa = 3706,
    chamado.tpChamado = this.chamadoForm.value.tpChamado;
    chamado.dsChamado = this.chamadoForm.value.dsChamado;
    chamado.noArquivo = this.chamadoForm.value.noArquivo;


    this.chamadoService.criarChamado(chamado).subscribe(data => {
      this.chamadoRecebido = data;
    },
    (e) => {
      var a = 'Falha ao criar chamado';
    });

    
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
