import { Endereco } from "./endereco";
export class Person {
    id: number;
    nome: string;
    /* rg: string;
    cpf: string; */
    emailInstitucional: string;
    emailPessoal: string;
    sexo: string;
    telefone: string;
    dataNascimento: string;
    funcao: string;
    cargo: string;
    lotacao: string;
    afiliado: number;
    endereco: Endereco;
    matricula: string;
    celular1: string;
    celular2: string;
    comarca: string;
    envio: boolean;
    senha: string;
    
    constructor(){
      this.endereco = new Endereco();
    }
}