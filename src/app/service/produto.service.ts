import { Produto } from './../model/Produto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  /* CONSTROI O CAMINHO PARA O SERVIDOR */
  server = environment.server + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

  /*autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }*/

  findAllProdutos(): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.server}/produtos`);
  }

  findByIdProduto(id: number): Observable<Produto> {

    return this.http.get<Produto>(`${this.server}/produtos/${id}`);
  }

  postProduto(produto: Produto): Observable<Produto> {

    return this.http.post<Produto>(`${this.server}/produtos`, produto);
  }

  putProduto(produto: Produto): Observable<Produto> {

    return this.http.put<Produto>(`${this.server}/produtos`, produto);
  }

  deleteProduto(id: number) {

    return this.http.delete(`${this.server}/produtos/${id}`);
  }

}
