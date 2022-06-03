import { Produto } from './Produto';

export class Mesa {
  public id: number;
  public nome: string;
  public senha: string;
	public produtos: Produto[];
  public img: string;
  public tipo: string;
  public total: number;

}
