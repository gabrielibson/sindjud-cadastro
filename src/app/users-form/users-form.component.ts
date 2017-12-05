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
  erroBody: any;

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
      r => {
        this.submitted = true
      },
      err => {
        this.isLoading = false;
        this.erroBody = JSON.parse(err._body);
        this.msgError = this.erroBody.message;
      }
    );
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
    { value: 'FAP-AJ1G_Apoio à Atividade Jurisdicional do 1º Grau de Jurisdição' },
    { value: 'FGAM_Assessor de Magistrado de 1º Grau' },
    { value: 'FGJ-1_Chefe de Núcleo' },
    { value: 'FGJ-2_Chefe de Unidade' },
    { value: 'FGCSJ-1_Chefe de Secretaria' },
    { value: 'FGCSJ-2_Chefe de Secretaria Adjunto' },
    { value: 'FGCSJD_Chefe de Secretaria de Estrutura Diferenciada' },
    { value: 'FGDR_Diretor Regional' },
    { value: 'FGDPR_Diretor de Diretoria de Processamento Remoto' },
    { value: 'FGDEPR_Diretor Executivo de Diretoria de Processamento Remoto' },
    { value: 'FGJ-1_Gerente' },
    { value: 'FGJ-2_Gerencial Judiciária' },
    { value: 'FGJ-2_Gestor de Projeto' },
    { value: 'FGGPE-1_Gestor de Projeto Estratégico I' },
    { value: 'FGGPE-2_Gestor de Projeto Estratégico II' },
    { value: 'FGGPE-3_Gestor de Projeto Estratégico III' },
    { value: 'FGSPR_Supervisor de Processamento Remoto' },
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