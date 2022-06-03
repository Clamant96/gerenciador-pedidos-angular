import { Observable } from 'rxjs';
import { Categoria } from './../model/Categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  /* CONSTROI O CAMINHO PARA O SERVIDOR */
  server = environment.server + environment.porta;

  constructor(
    private http: HttpClient

  ) { }

  /*autorizacao = {
    headers: new HttpHeaders().set('Authorization', environment.token)

  }*/

  findAllCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.server}/categorias`);
  }

  findByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.server}/categorias/${id}`);
  }

  postCategoria(produto: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.server}/categorias`, produto);
  }

  putCategoria(produto: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.server}/categorias`, produto);
  }

  deleteCategoria(id: number) {

    return this.http.delete(`${this.server}/categorias/${id}`);
  }

}
