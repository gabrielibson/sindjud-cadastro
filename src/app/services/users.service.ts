import { environment } from './../../environments/environment';
import { Person } from '../model/person';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  baseUrl: string = environment.url;
  constructor(private http : Http) { }

 /*  getAll(): Observable<Person[]>{
    let users$ = this.http
    .get(`${this.baseUrl}/users`, {headers: this.getHeaders()})
    .map(mapUsers);
    return users$;
  } */

  get(matricula: string) : Observable<Person>{
    let user$ = this.http
    .get(`${this.baseUrl}/users/${matricula}`, {headers: this.getHeaders()})
    .map(mapPerson);
    return user$;
  }

  save(captchaResponse: string, person: Person): Observable<Response>{
    return this.http.post(`${this.baseUrl}/users`, {recaptcha: captchaResponse, person}, {headers: this.getHeaders()})
  }

  activateUser(matricula: string, code: string): Observable<Response>{
    return this.http.get(`${this.baseUrl}/users/validarCodigoAcesso?matricula=${matricula}&codigoAcesso=${code}`);
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

/* function mapUsers(response:Response): Person[]{
  // The response of the API has a results
  // property with the actual results
  return response.json().map(toPerson)
} */

function toPerson(r:any): Person{
  let person = <Person>({
    matricula: r.matricula,
    nome: r.nome,
    dataNascimento: r.dataNascimento,
    sexo: r.sexo
  });
  return person;
}

function mapPerson(response:Response): Person{
   // toPerson looks just like in the previous example
   return toPerson(response.json());
}