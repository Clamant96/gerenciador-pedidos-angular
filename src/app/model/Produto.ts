import { Categoria } from './Categoria';
import { Mesa } from './Mesa';

export class Produto {
  public id: number;
  public nome: string;
  public preco: number;
  public ativo: boolean;
  public promocao: number;
  public img: string;
  public mesas: Mesa[];
  public qtdProduto: number;
  public categoria: Categoria;
  public descricao: string;

}
