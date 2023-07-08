import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChamadoComponent } from './chamado/chamado.component';

const routes: Routes = 
[
{
  path: 'home',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'chamado',
  component: ChamadoComponent
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
