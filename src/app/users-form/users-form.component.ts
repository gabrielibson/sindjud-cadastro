import { Comarca } from './../util/comarca';
import { UsersService } from './../services/users.service';
import { Person } from './../model/person';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { default as cep } from 'cep-promise';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  sub: any;
  person: Person;
  people: Person[] = [];
  msgError: string;
  result: any;
  comarcas: Comarca;
  isLoading = false;
  siteKey = "6LfS2ToUAAAAAMb4wQhvcXkbZu_3KnD21Go1sX39";

  submitted = false;

  constructor(private usersService: UsersService) {
    this.person = new Person();
    this.comarcas = new Comarca();
  }

  ngOnInit() {
    /*this.usersService
    .getAll()
    .subscribe(p => this.people = p);*/
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  savePerson(captchaResponse: string) {
    this.isLoading = true;
    this.sub = this.usersService.save(captchaResponse, this.person).subscribe(
      r => this.submitted = true);
  }

  consultarCEP() {
    cep(this.person.endereco.cep).then(r => {
      this.person.endereco.bairro = r.neighborhood;
      this.person.endereco.rua = r.street;
      this.person.endereco.estado = r.state;
      this.person.endereco.cidade = r.city;
    });
  }

  consultarPessoa() {
    if (this.person.cpf !== undefined && this.person.cpf !== "") {
      this.usersService.get(this.person.cpf).subscribe(
        r => {
          this.msgError = "Pessoa já cadastrada!";
        });
    }
  }

  public dateMask = [/^[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d$/]
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public celMask = ['(', /[1-9]/, /\d/, ')', ' ', /[9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]


  options = [
    { value: 'M', viewValue: 'Masculino' },
    { value: 'F', viewValue: 'Feminino' },
    { value: 'Outros', viewValue: 'Outros' }
  ];

  cargos = [
    { value: 'Aux. Judiciário' },
    { value: 'Téc. Judiciário' },
    { value: 'Téc. Judiciário - Informática' },
    { value: 'Téc. Administrativo' },
    { value: 'Analista Judiciário' },
    { value: 'Analista Administrativo' },
    { value: 'Analista Judiciário - Informática' },
    { value: 'Analista Judiciário - Apoio Especializado (Assistente Social - Psicólogo - Pedagogo)' },
    { value: 'Analista Judiciário - Equipe de Saúde (Odontologista - Médico)' }
  ];

 fgs = [
    { value: 'Nenhuma' },
    { value: 'Chefe de Secretaria Adjunto' },
    { value: 'Assessor de Magistrado' },
    { value: 'Secretariado e Apoio Administrativo' },
    { value: 'Supervisor de Processamento Remoto' },
    { value: 'Gerente' },
    { value: 'Gestor de Projeto Estratégico' },
    { value: 'Diretor Executivo de Diretoria de Processamento' },
    { value: 'Chefe de Núcleo' },
    { value: 'Diretor Regional' }
  ]

  dadosPessoais = false;
  showDadosPessoais() {
    this.dadosPessoais = false;
    window.scrollTo(0, 0);
  }

  showDadosFuncionais() {
    this.dadosPessoais = true;
    window.scrollTo(0, 0);
  }

  onSubmit(form) {
    console.log(form);
  }

}