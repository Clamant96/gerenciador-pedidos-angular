import { MesaLogin } from './../model/MesaLogin';
import { MesaService } from './../service/mesa.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mesaLogin: MesaLogin = new MesaLogin();

  constructor(
    private mesaService: MesaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  logar() {
    this.mesaService.login(this.mesaLogin).subscribe((resp: MesaLogin) => {
      this.mesaLogin = resp;

      environment.id = this.mesaLogin.id;
      environment.nome = this.mesaLogin.nome;
      environment.senha = this.mesaLogin.senha;
      environment.tipo = this.mesaLogin.tipo;
      environment.img = this.mesaLogin.img;

      console.log(environment.id);
      console.log(environment.nome);
      console.log(environment.senha);
      console.log(environment.tipo);
      console.log(environment.img);

      if(environment.tipo == "adm") {
        this.router.navigate(['/gerencia']);

      }else {
        this.router.navigate(['/home']);

      }

    }, erro => {
      if(erro.status == 500) {
        alert('Usuario ou senha estao incorretos!');

      }

    });

  }

}
