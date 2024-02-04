import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamadoDTOComponent } from '../dtos/chamadoDTO.component';
import { ChamadoService } from './chamado.service';
import { ChamadoSituacao } from '../enums/chamadoSituacao';
import { empresaDadosadDTOcomponent } from '../dtos/empresaDadosadDTO.component';

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
  tipo!: string;
  contato!: string;
  status!: string;
  descricao!: string;
  arquivo!: string;
  listarChamado!: boolean;
  scChamado!: string;
  showNovoChamado: boolean = true;
  showFormChamado!: boolean;
  showFormResponder!: boolean;
  showMessageCreate!: boolean;
  showMessageRespondido!: boolean;
  showLoading!: boolean;
  files!: FileList;
  newFiles!: FileList;
  listFiles!: FileList;

  empresaDadosad!: empresaDadosadDTOcomponent[];
  empresaDadosadSelecionado: any = "";
  chamados!: ChamadoDTOComponent[];
  fileList!: string;
  nuProtocolo: any;
  tpChamado: any;

  numeroPagina: number = 1;
  count: any;
  cnpj: any;
  statusAtual: any;
  situacaoAtual!: string;
  idChamado!: string;
  idEmprad!: string;
  dataAbertura!: string;
  duracaoChamado!: string;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private chamadoService: ChamadoService) { }

  ngOnInit() {
    this.idEmpresa = this.chamadoService.idEmpresa;
    this.verfificarTelebrasiliaLogada();
    this.createForm(new ChamadoDTOComponent());
  }

  isFinalizado(chamado: ChamadoDTOComponent) {
    if (chamado.stProtocolo === 'Finalizado') {
        return true;
    } 
    else if (chamado.stProtocolo === 'Aberto' && chamado.totalProtocolos === 1 && this.telebrasiliaLogado) {
      return false;
    }
    else if (chamado.stProtocolo === 'Em execução' && chamado.totalProtocolos > 1 && chamado.finalizado === 0) {
      return false;
    } else if (chamado.stProtocolo === 'Em execução' && chamado.totalProtocolos > 1 && chamado.finalizado === 1) {
      return true;
    }  else {
      return true;
    }
  }
      
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

  protocoloSelecionado(chamado: ChamadoDTOComponent){
    if (chamado.dataAbertura != null) {
      this.dataAbertura = chamado.dataAbertura;
    } else {
      this.dataAbertura = "Sem execução";
    }

    if (chamado.duracaoChamado != null) {
      this.duracaoChamado = chamado.duracaoChamado;
    } else {
      this.duracaoChamado = "Sem execução";
    }
    
    
    this.files = this.newFiles;
    this.statusAtual = chamado.stProtocolo;
    this.idChamado = chamado.idChamado;
    this.situacaoAtual = chamado.scChamado;
    this.idEmprad = chamado.idEmprad;
    this.cnpj = chamado.cnpj;
    this.tpChamado = chamado.tpChamado;
    this.nuProtocolo = chamado.nuProtocolo;
    this.idChamado = chamado.idChamado;
    this.listarChamado = false;
    this.showFormResponder = true;
    this.showNovoChamado = false;
    this.createForm(new ChamadoDTOComponent());
    this.showMessageCreate = false;
  }

  carregarArquivo(idProtocolo: any, filename: any){
    let file = new ChamadoDTOComponent();
    file.idProtocolo = idProtocolo;
    file.noArquivo = filename;
    this.chamadoService.carregarArquivo(filename,idProtocolo).subscribe(response => {
      let blob:any = new Blob([response], { type: response.type });
			const url = window.URL.createObjectURL(blob);
			window.open(url);
    },
    (e) => {
        return;
    });

  }

  novo(){
    this.idEmprad = '';
    this.files = this.newFiles;
    this.listarChamado = false;
    this.showFormChamado = true;
    this.showNovoChamado = false;
    this.createForm(new ChamadoDTOComponent());
    this.showMessageCreate = false;

    this.chamadoService.consultarEmpresaDadosad().subscribe( data => {
      this.empresaDadosad = data.data;
    },
    (e) => {
      return;
    });
  }

  createForm(chamado: ChamadoDTOComponent) {
    this.chamadoForm =  this.formBuilder.group({
      cnpj: new FormControl(chamado.cnpj),
      tpChamado: new FormControl(chamado.tpChamado),
      dsChamado: new FormControl(chamado.dsChamado),
      noArquivo: new FormControl(chamado.noArquivo),
      stProtocolo: new FormControl(chamado.stProtocolo),
      scChamado: new FormControl(chamado.scChamado),
      dsProtocolo: new FormControl(chamado.dsProtocolo),
      nuProtocolo: new FormControl(chamado.nuProtocolo),
      idEmprad: new FormControl(chamado.idEmprad),
      contato: new FormControl(chamado.contato)
    })
  }


  setUploadFiles (event: Event){
    const target = event.target as HTMLInputElement;
    this.files = target.files as FileList;
  }

  criar() {
    if (this.chamadoForm.value.tpChamado == '' || this.chamadoForm.value.tpChamado == null) {
      this.tipo = 'Selecionar o tipo do chamado';
      return;
    }

    if (this.chamadoForm.value.idEmprad == '' || this.chamadoForm.value.idEmprad == null) {
      this.idEmprad = 'Selecionar a localidade afetada';
      return;
    }

    if (this.chamadoForm.value.contato == '' || this.chamadoForm.value.contato == null) {
      this.contato = 'Selecionar o contato responsável técnico';
      return;
    }

    if (this.chamadoForm.value.dsChamado == '' || this.chamadoForm.value.dsChamado == null) {
      this.descricao = 'Preencher a descrição do chamado';
      return;
    }

    let chamado = new ChamadoDTOComponent();
    chamado.tpChamado = this.chamadoForm.value.tpChamado;
    chamado.dsChamado = this.chamadoForm.value.dsChamado;
    chamado.noArquivo = this.chamadoForm.value.noArquivo;
    chamado.idEmprad = this.chamadoForm.value.idEmprad;

    this.showLoading = true;
      this.chamadoService.criar(this.files, chamado).subscribe(data => {
        this.showLoading = false;
        this.showMessageCreate = true;
        this.showFormChamado = false;
        this.showNovoChamado = true;
      },
        (e) => {
          this.showLoading = false;
        });
  }

  anterioPagina(numeroPagina: number){
    this.numeroPagina -= 1;
    this.consultarChamado();
  }

  proximaPagina(numeroPagina: number){
    this.numeroPagina += 1;
    this.consultarChamado();
  }

  consultarChamado(){
    this.showMessageCreate = false;
    this.showLoading = true;
    this.showMessageRespondido = false;

    let chamado = new ChamadoDTOComponent();
    chamado.stProtocolo = this.chamadoForm.value.stProtocolo;
    chamado.nuProtocolo = this.chamadoForm.value.nuProtocolo;
    chamado.pageNumber = this.numeroPagina;

    this.chamadoService.consultarChamado(chamado).subscribe(data => {
      this.chamados = data.data;
      this.showLoading = false;
      this.listarChamado = true;
    },
    (e) => {
      this.showLoading = false;
    });
  }

  responder(){
    if(this.chamadoForm.value.stProtocolo == '' || this.chamadoForm.value.stProtocolo == null && this.telebrasiliaLogado){
      this.status = 'Selecionar o status';
      return;
    }

    if(this.chamadoForm.value.scChamado == '' || this.chamadoForm.value.scChamado == null && !this.telebrasiliaLogado){
      this.status = 'Selecionar a Situação do chamado';
      return;
    }

    if(this.chamadoForm.value.dsChamado == '' || this.chamadoForm.value.dsChamado == null){
      this.descricao = 'Preencher a descrição';
      return;
    }

    let chamado = new ChamadoDTOComponent();
    chamado.idEmpresa = this.idEmpresa;
    chamado.cnpj = this.cnpj;
    chamado.idEmprad = this.idEmprad;
    
    
    if(this.chamadoForm.value.stProtocolo != null){
      chamado.stProtocolo = this.chamadoForm.value.stProtocolo;
    } else {
      chamado.stProtocolo = this.statusAtual;
    }
    
    chamado.dsProtocolo = this.chamadoForm.value.dsProtocolo;
    chamado.dsChamado = this.chamadoForm.value.dsChamado;
    chamado.idChamado = this.idChamado;
    chamado.nuProtocolo = this.nuProtocolo;
    chamado.tpChamado = this.tpChamado;
    chamado.noArquivo = this.chamadoForm.value.noArquivo;
    
    if (this.chamadoForm.value.scChamado === 'Resolvido') {
      chamado.scChamado = ChamadoSituacao.RESOLVIDO;
    } else if (this.chamadoForm.value.scChamado === 'Não resolvido'){
      chamado.scChamado = ChamadoSituacao.NAO_RESOLVIDO;
    } else{
      chamado.scChamado = this.situacaoAtual;
    }
    
    this.showLoading = true;
      this.chamadoService.responder(this.files, chamado).subscribe(data => {
          this.showLoading = false;
          this.showMessageRespondido = true;
          this.showFormResponder = false;
          this.showNovoChamado = true;
          this.createForm(new ChamadoDTOComponent());

        },
        (e) => {
          this.showLoading = false;
        }
      );
  }

  setCleanTipo (){
    this.tipo = '';
  }

  setCleanTitulo (){
    this.titulo = '';
  }

  setCleanStProtocolo (){
    this.status = '';
  }

  
  setCleanScChamado (){
    this.status = '';
  }

  setCleanDescricao (){
    this.descricao = '';
  }

  selecionarLocalidade(dadosad: number){
    var data =  this.empresaDadosad.find(data => data.idEmprad == dadosad);
    this.empresaDadosadSelecionado = data?.noContato + " - " + data?.tlContato + " - " + data?.email;
    this.idEmprad = '';
  }

  selecionarContato(){
    this.contato = '';
  }
}
