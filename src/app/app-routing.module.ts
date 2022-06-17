import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ProdutoComponent } from './produto/produto.component';
import { GerenciaComponent } from './gerencia/gerencia.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"cadastro",
    component: CadastroComponent
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"gerencia",
    component: GerenciaComponent
  },
  {
    path: 'home/:id',
    component: HomeComponent
  },
  {
    path: 'produto/:id',
    component: ProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
