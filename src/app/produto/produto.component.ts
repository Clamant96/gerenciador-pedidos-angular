import { Produto } from './../model/Produto';
import { ProdutoService } from './../service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  public produto: Produto = new Produto();

  public id: number = 0;

  public idUsuario: number = environment.id;

  public idMemoriaNavegacao = environment.memoriaNavegacaoUsuario;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(this.idUsuario == 0) {
      this.router.navigate(['/login']);

    }

    // IRA ENTRAR NESSA CONDICAO CASO SEJA UM ADM
    this.id = this.route.snapshot.params['id'];

    this.getByIdProduto(this.id);

  }

  getByIdProduto(id: number) {
    this.produtoService.findByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    });

  }

}
