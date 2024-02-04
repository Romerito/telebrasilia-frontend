import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTOComponent } from '../dtos/loginDTO.component';
import { LoginService } from './login.service';
import { ChamadoService } from '../chamado/chamado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cnpjReceveid!: string;
  idEmpresa!: string;

  title = 'Login';
  loginForm!: FormGroup;
  login: boolean = true;
  forgotPassword: boolean = false;
  sendPassord: boolean = false;
  errorSendPassord: boolean = false;
  savedPassord: boolean = false;
  savePassword: boolean = false;

  senha!: string;
  confirmarSenha!: string;
  email!: string;
  cnpj!: string;

  emailSended!: string;

  showLoading!: boolean;

  passwordReceveid!: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: LoginService, private chamadoService: ChamadoService) { }

  ngOnInit() {
    this.createForm(new LoginDTOComponent());
  }

  cancelarEnvioEmail(){
    this.errorSendPassord = false;
    this.login = true;
    this.forgotPassword = false;
    this.createForm(new LoginDTOComponent());
  }

  createForm(login: LoginDTOComponent) {
    this.loginForm =  this.formBuilder.group({
      senha: new FormControl(login.senha),
      cnpj: new FormControl(login.cnpj),
      remeberme: new FormControl(login.remeberme)
    })
  }

  onSubmit() {
    if(this.loginForm.value.cnpj == '' || this.loginForm.value.cnpj == null){
      if(this.loginForm.value.senha == '' || this.loginForm.value.senha == null){
        this.senha = 'Preecha o campo senha!';
      }
      this.cnpj = 'Preecha o campo cnpj!';
      return;
    }
    if(this.loginForm.value.senha == '' || this.loginForm.value.senha == null){
      if(this.loginForm.value.cnpj == '' || this.loginForm.value.cnpj == null){
        this.cnpj = 'Preecha o campo cnpj!';
      }
      this.senha = 'Preecha o campo senha!';
      return;
    }

    let acesso = new LoginDTOComponent();
    acesso.senha = this.loginForm.value.senha;
    acesso.cnpj = this.loginForm.value.cnpj;

    this.service.getLogin(acesso).subscribe(data => {
      this.idEmpresa = data.data.idEmpresa;
      this.passwordReceveid = data.data.senha;
      this.cnpjReceveid = data.data.cnpj;
      if(this.passwordReceveid == this.loginForm.value.senha && this.cnpjReceveid == this.loginForm.value.cnpj){
        this.chamadoService.idEmpresa = this.idEmpresa;
        this.router.navigate(['/home']);
      }
    },
      (e) => {
        this.cnpj = 'Verificar CNPJ';
        this.senha = 'Varificar senha';
      });
  }

  setForgotPassword() {
    this.login = false;
    this.forgotPassword = true;
    this.createForm(new LoginDTOComponent());
  }

  setCleanEmail(){
    this.email = '';
  }

  setCleanConfirmarSenha(){
    this.confirmarSenha = '';
  }

  setCleanSenha(){
    this.senha = '';
  }

  setCleanCnpj(){
    this.cnpj = '';
    this.errorSendPassord = false;
  }

  getPassword() {
    this.sendPassord = false;

    if(this.loginForm.value.cnpj == '' || this.loginForm.value.cnpj == null){
      this.cnpj = 'Preecha o campo cnpj!';
      return;
    }
    this.showLoading = true;
    this.service.getEmpresa(this.loginForm.value.cnpj).subscribe(data => {
      this.emailSended = data.data.e_mail2;
      this.showLoading = false;
      this.sendPassord = true;
      this.errorSendPassord = false;
    },
     (e) => {
      this.sendPassord = false;
      this.showLoading = false;
      this.errorSendPassord = true;
    });
  }

  setLogin() {
    this.login = true;
    this.forgotPassword = false;
    this.sendPassord = false;
    this.savePassword = false;
    this.savedPassord = false;
    this.createForm(new LoginDTOComponent());
  }

  savePasswords() {
    if (this.loginForm.value.senha == '' || this.loginForm.value.senha == null) {
      this.senha = 'Preecha o campo senha';
      if (this.loginForm.value.confirmarSenha == '' || this.loginForm.value.confirmarSenha == null) {
        this.confirmarSenha = 'Preecha o campo confirmar senha';
      }
    }
    if (this.loginForm.value.senha == this.loginForm.value.confirmarSenha) {
      this.savedPassord = true;
    }
    if (this.loginForm.value.confirmarSenha != this.loginForm.value.senha) {
      this.confirmarSenha = 'O campo confirmar senha é diferente';
    }
    return;
  }
}
