import { ProdutoService } from './../service/produto.service';
import { Produto } from './../model/Produto';
import { Mesa } from './../model/Mesa';
import { MesaService } from './../service/mesa.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-gerencia',
  templateUrl: './gerencia.component.html',
  styleUrls: ['./gerencia.component.css']
})
export class GerenciaComponent implements OnInit {

  public listaMesas: Mesa[];

  public produto: Produto = new Produto();
  public mesa: Mesa = new Mesa();

  public contador: number = 0;

  public key = 'data';
  public reverse = true;

  constructor(
    private mesaService: MesaService,
    private produtoService: ProdutoService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.getAllMesas();

  }

  getAllMesas() {

    // CARREGA TODOS OS USUARIO DA BASE
    this.mesaService.findAllMesas().subscribe((resp: Mesa[]) => {

      resp.map((produto) => {

        // NAVEGA NO RETORNO DA MESA, E PREENCHE O NOME DO PRODUTO
        produto.produtos.map((item) => {

          if((produto.produtos.length - 1) == this.contador) {
            item.img = item.img;

            this.contador = 0;

          }else {
            item.img = "";

            this.contador++;

          }

        });

      });

      // POPULA O OBJ MESA COM O RETORNO TRATADO
      this.listaMesas = resp;

    });

  }

  buscaUltimoPedidoMesa(id: number) {
    this.mesaService.carregaUltimoPedidoMesa(id).subscribe((resp: Produto) => {
      this.produto = resp;

    });

  }

}
