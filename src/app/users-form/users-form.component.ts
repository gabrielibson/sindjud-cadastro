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
  msgError: string;
  result: any;
  comarcas: Comarca;
  isLoading = false;
  erroBody: any;
  matriculaPrompt: boolean = true;

  dadosPessoais = false;
  dadosFuncionais = true;
  formSenha = true;

  confirmaSenha: string;

  submitted = false;

  public barLabel: string = "Força da Senha:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(private usersService: UsersService) {
    this.person = new Person();
    this.comarcas = new Comarca();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  savePerson(captchaResponse: string) {
    this.isLoading = true;
    if (this.person.senha === this.confirmaSenha) {
      this.person.emailInstitucional = this.person.emailInstitucional.toLowerCase();
      this.person.emailPessoal = this.person.emailPessoal.toLowerCase();
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
    else {
      this.isLoading = false;
      alert("As senhas devem ser iguais!");
    }
  }

  showDadosPessoais() {
    this.dadosPessoais = false;
    this.dadosFuncionais = true;
    window.scrollTo(0, 0);
  }

  showDadosFuncionais() {
    this.dadosFuncionais = false;
    this.dadosPessoais = true;
    this.formSenha = true;
    window.scrollTo(0, 0);
  }

  showSenha() {
    this.dadosFuncionais = true;
    this.formSenha = false;
    window.scrollTo(0, 0);
  }

  onSubmit(form) {
    console.log(form);
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
    this.isLoading = true;
    if (this.person.matricula !== undefined && this.person.matricula !== "") {
      this.usersService.get(this.person.matricula).subscribe(
        r => {
          this.msgError = "Pessoa já cadastrada!";
          this.isLoading = false;
        },
        error =>{
          if(error.status === 404){
            this.matriculaPrompt = false;
          }else{
            this.msgError = "Sistema temporariamente indisponível";
          }
          this.isLoading = false;
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
    { value: 'Aux. Judiciário - PJ I' },
    { value: 'Téc. Judiciário (TPJ) - Função Judiciária' },
    { value: 'Téc. Judiciário (TPJ) - Função Administrativa' },
    { value: 'Téc. Judiciário (TPJ) - Apoio Especializado' },
    { value: 'Analista Judiciário (APJ) - Função Judiciária' },
    { value: 'Analista Judiciário (APJ) - Função Administrativa' },
    { value: 'Analista Judiciário (APJ) - Apoio Especializado' },
    { value: 'Oficial de Justiça - OPJ' },
    { value: 'Oficial de Justiça - PJ III' }
  ];

  fgs = [
    { value: 'Nenhuma' },
    { value: 'AP-AJ1G_Apoio à Atividade Jurisdicional do 1º Grau de Jurisdição' },
    { value: 'FGAM_Assessoria de Magistrado' },
    { value: 'FGJ-1_Chefia de Núcleo/Distribuição/Secretarias/Precatórios/Seção/Gerência' },
    { value: 'FGJ-2_Chefia de Unidade/Secretaria Geral Adjunta/Gerencial Judiciária/Gestão Projetos' },
    { value: 'FGCSJ-1_Chefia de Secretaria' },
    { value: 'FGCSJ-2_Chefia de Secretaria Adjunta' },
    { value: 'FGCSJD_Chefia de Secretaria de Estrutura Diferenciada' },
    { value: 'FGCJ-1_Conciliação Juizado' },
    { value: 'FGDR_Diretoria Regional' },
    { value: 'FGDPR_Diretoria de Processamento Remoto' },
    { value: 'FGDEPR_Diretoria Executiva de Processamento Remoto' },
    { value: 'FGNDM-1_Chefia Núcleo Distribuição de Mandados' },
    { value: 'FSJ-1_Distribuição Queixas Juizados/Secretarias' },
    { value: 'FSJ-3_Administração Foro' },
    { value: 'FGGPE-1_Gestão de Projeto Estratégico I' },
    { value: 'FGGPE-2_Gestão de Projeto Estratégico II' },
    { value: 'FGGPE-3_Gestão de Projeto Estratégico III' },
    { value: 'FGSPR_Supervisão de Processamento Remoto' },
  ]
}