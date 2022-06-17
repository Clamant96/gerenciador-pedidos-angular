import { Router } from '@angular/router';
import { Mesa } from './../model/Mesa';
import { MesaService } from './../service/mesa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public mesa: Mesa = new Mesa();

  public confirmarSenha: string;
  public tipoMesa: string;

  constructor(
    private mesaService: MesaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  /* VERIFICA SE A SENHA CRIADA E MESMA DE CONFIRME SENHA */
  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  tipoM(event:any){
    this.tipoMesa = event.target.value;

  }

  cadastro() {
    if(this.mesa.senha != this.confirmarSenha) {
      /* INFORMA UM ALERTA AO USUARIO */
      alert('As senhas estao incorretas!');

    }else {
      this.mesa.senha = this.confirmarSenha;
      this.mesa.tipo = this.tipoMesa;

      this.mesaService.cadastrar(this.mesa).subscribe((resp: Mesa) => {
        this.mesa = resp;

        this.router.navigate(['/login']);

      });

    }

  }

}
