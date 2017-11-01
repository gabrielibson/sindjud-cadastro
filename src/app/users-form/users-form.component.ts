import { UsersService } from './../users.service';
import { Person } from './../person';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  person: Person;
  people: Person[] = [];

  constructor(private usersService: UsersService) {
    this.person = new Person();
  }

  ngOnInit() {
    this.usersService
    .getAll()
    .subscribe(p => this.people = p);
  }

  savePerson(){
    this.usersService.save(this.person).subscribe(r => console.log(`saved!!! ${JSON.stringify(this.person)}`));
  }

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

}
