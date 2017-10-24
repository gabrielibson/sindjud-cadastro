import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  public dateMask = [/^[0-9]/,/\d/,'/',/[0-9]/,/\d/,'/',/[0-9]/,/\d/,/\d/,/\d$/]
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  /* '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ */
  options = [
    {value: 'M', viewValue: 'Masculino'},
    {value: 'F', viewValue: 'Feminino'}
  ];

  showme = true
  next = false
  showDadosPessoais(){
    this.showme = true;
    this.next = false;
  }

  showDadosFuncionais(){
    this.showme = false;
    this.next = true;
  }

  onSubmit(form){
    console.log(form);
  }

  constructor() { }

  ngOnInit() {
  }

}
