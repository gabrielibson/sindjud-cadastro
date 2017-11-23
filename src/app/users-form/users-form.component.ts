import { UsersService } from './../services/users.service';
import { Person } from './../model/person';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  sub: any;
  person: Person;
  people: Person[] = [];

  submitted = false;

  constructor(private usersService: UsersService) {
    this.person = new Person();
  }

  ngOnInit() {
    /*this.usersService
    .getAll()
    .subscribe(p => this.people = p);*/
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  savePerson(){
    this.sub = this.usersService.save(this.person).subscribe(
      r => this.submitted = true);
  }

  public dateMask = [/^[0-3]/,/\d/,'/',/[0-1]/,/\d/,'/',/[1-2]/,/\d/,/\d/,/\d$/]
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public celMask = ['(', /[1-9]/, /\d/, ')', ' ', /[9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  

  options = [
    {value: 'M', viewValue: 'Masculino'},
    {value: 'F', viewValue: 'Feminino'}
  ];

  cargos = [
    {value: 'Aux. Judiciário'},  
    {value: 'Téc. Judiciário'}, 
    {value: 'Téc. Judiciário - Informática'}, 
    {value: 'Téc. Administrativo'},
    {value: 'Analista Judiciário'}, 
    {value: 'Analista Administrativo'}, 
    {value: 'Analista Judiciário - Informática'}, 
    {value: 'Analista Judiciário - Apoio Especializado (Assistente Social - Psicólogo - Pedagogo)'},
    {value: 'Analista Judiciário - Equipe de Saúde (Odontologista - Médico)'}
  ];

  dadosPessoais = false;
  showDadosPessoais(){
    this.dadosPessoais = false;
    window.scrollTo(0,0);
  }

  showDadosFuncionais(){
    this.dadosPessoais = true;
    window.scrollTo(0,0);
  }

  onSubmit(form){
    console.log(form);
  }

}