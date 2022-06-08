import { Produto } from './../model/Produto';
import { Mesa } from './../model/Mesa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  /* CONSTROI O CAMINHO PARA O SERVIDOR */
  server = environment.server + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

  /*autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }*/

  findAllMesas(): Observable<Mesa[]> {

    return this.http.get<Mesa[]>(`${this.server}/mesas`);
  }

  findByIdMesa(id: number): Observable<Mesa> {

    return this.http.get<Mesa>(`${this.server}/mesas/${id}`);
  }

  adicionarProdutoAMesa(idMesa: number, idProduto: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.server}/mesas/mesa_produto/adiciona/idMesa/${idMesa}/idProduto/${idProduto}`);
  }

  removerProdutoAMesa(idMesa: number, idProduto: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.server}/mesas/mesa_produto/remove/idMesa/${idMesa}/idProduto/${idProduto}`);
  }

  removerTodosProdutoAMesa(idMesa: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.server}/mesas/limpaCarrinhoMesa/${idMesa}`);
  }

  carregaUltimoPedidoMesa(idMesa: number): Observable<Produto> {

    return this.http.get<Produto>(`${this.server}/mesas/buscaUltimoProdutoMesa/${idMesa}`);
  }

}
