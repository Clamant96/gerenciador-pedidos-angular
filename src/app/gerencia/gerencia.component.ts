import { Router } from '@angular/router';
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

  public id: number = environment.id;

  public comprimentoLista: number = 0;

  constructor(
    private mesaService: MesaService,
    private produtoService: ProdutoService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(this.id == 0) {
      this.router.navigate(['/login']);

    }

    this.getAllMesas();

  }

  getAllMesas() {

    // CARREGA TODOS OS USUARIO DA BASE
    this.mesaService.findAllMesas().subscribe((resp: Mesa[]) => {

      // POPULA O OBJ MESA COM O RETORNO TRATADO
      this.listaMesas = resp;

      this.comprimentoLista = this.listaMesas.length;

    });

  }

  buscaUltimoPedidoMesa(id: number) {
    this.mesaService.carregaUltimoPedidoMesa(id).subscribe((resp: Produto) => {
      this.produto = resp;

    });

  }

  redirecionaParaPaginaProduto(idMesa: number, idProduto: number) {

    environment.memoriaNavegacaoUsuario = idMesa; // ARMAZENA A NAVEGACAO DO PRODUTO DO ULTIMO CARRINHO CLICADO DENTRO DE GERENCIA

    this.router.navigate(['/produto', idProduto]);

  }

}
