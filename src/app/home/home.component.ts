import { MesaService } from './../service/mesa.service';
import { Mesa } from './../model/Mesa';
import { Categoria } from './../model/Categoria';
import { CategoriaService } from './../service/categoria.service';
import { Produto } from './../model/Produto';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaCategorias: Categoria[];
  public listaMesas: Mesa[];

  public mesa: Mesa = new Mesa();
  public produto: Produto = new Produto();

  public id: number = environment.id;
  public tipo: string = environment.tipo;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private mesaService: MesaService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(this.id == 0) {
      this.router.navigate(['/login']);

    }

    this.getAllCategorias(); // CARREGA A LISTA COM TODOS OS PRODUTOS DA BASE DE DADOS

    if(this.tipo != "mesa") {
      // IRA ENTRAR NESSA CONDICAO CASO SEJA UM ADM
      this.id = this.route.snapshot.params['id'];

    }else {
      this.id = environment.id;

    }

    environment.memoriaNavegacaoUsuario = this.id; // ARMAZENA A MEMORIA DO ID DE NAVEGACAO

    if(this.id > 0) {
      this.getByIdMesa(this.id);
    }

  }

  getAllCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp;

    });

  }

  getByIdMesa(id: number) {
    this.mesaService.findByIdMesa(id).subscribe((resp: Mesa) => {

      // NAVEGA NO RETORNO DA MESA, E PREENCHE O NOME DO PRODUTO
      resp.produtos.map((item) => {

        // BUSCA PRODUTO POR ID
        this.produtoService.findByIdProduto(item.id).subscribe((respProduto: Produto) => {
          item.nome = respProduto.nome;

        });

      });

      // POPULA O OBJ MESA COM O RETORNO TRATADO
      this.mesa = resp;

    });

  }

  getByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    });

  }

  pedirProduto(idMesa: number, idProduto: number) {
    this.mesa.produtos = []; // ZERA A MEMORIA DO OBJ PARA QUE POSSA SER POPULADO NOVAMENTE COM OS VALORES DO BANCO
    this.mesa.total = 0; // ZERA A MEMORIA DO OBJ PARA QUE POSSA SER POPULADO NOVAMENTE COM OS VALORES DO BANCO

    this.mesaService.adicionarProdutoAMesa(idMesa, idProduto).subscribe((resp: boolean) => {

      if(resp) {
        this.getByIdMesa(idMesa);

      }else {
        alert("Ocorreu um erro ao tentar adicionar o produto no seu carrinho.");

      }

    });

  }

  removerProduto(idMesa: number, idProduto: number) {
    if(this.tipo != "mesa") {

      this.mesa.produtos = []; // ZERA A MEMORIA DO OBJ PARA QUE POSSA SER POPULADO NOVAMENTE COM OS VALORES DO BANCO
      this.mesa.total = 0; // ZERA A MEMORIA DO OBJ PARA QUE POSSA SER POPULADO NOVAMENTE COM OS VALORES DO BANCO

      this.mesaService.removerProdutoAMesa(idMesa, idProduto).subscribe((resp: boolean) => {

        if(resp) {
          this.getByIdMesa(idMesa);

        }else {
          alert("Ocorreu um erro ao tentar remover o produto no seu carrinho.");

        }

      });

    }else {
      alert("Você não tem permissão para realizar essa ação.");

    }

  }

  limparCarrinho(id: number) {
    this.mesa.produtos = []; // ZERA A MEMORIA DO OBJ PARA QUE POSSA SER POPULADO NOVAMENTE COM OS VALORES DO BANCO
    this.mesa.total = 0; // ZERA A MEMORIA DO OBJ PARA QUE POSSA SER POPULADO NOVAMENTE COM OS VALORES DO BANCO

    this.mesaService.removerTodosProdutoAMesa(id).subscribe((resp: boolean) => {

      if(resp) {
        alert("Carrinho limpo com sucesso!");

      }else {
        alert("Ocorreu um erro ao tentar limpar o carrinhi.");

      }

    });

  }

}
