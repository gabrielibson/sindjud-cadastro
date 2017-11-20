import { Person } from './person';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private baseUrl: string = 'http://sindjudonline.sindjudpe.org.br:8080/usersRestAPI-0.0.1-SNAPSHOT';
  constructor(private http : Http) { }

  getAll(): Observable<Person[]>{
    let users$ = this.http
    .get(`${this.baseUrl}/users`, {headers: this.getHeaders()})
    .map(mapUsers);
    return users$;
  }

  get(id: number) : Observable<Person>{
    let user$ = this.http
    .get(`${this.baseUrl}/users/${id}`, {headers: this.getHeaders()})
    .map(mapPerson);
    return user$;
  }

  save(person: Person): Observable<Response>{
    return this.http.post(`${this.baseUrl}/users`, person, {headers: this.getHeaders()})
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}

function mapUsers(response:Response): Person[]{
  // The response of the API has a results
  // property with the actual results
  return response.json().map(toPerson)
}

function toPerson(r:any): Person{
  let person = <Person>({
    id: r.id,
    nome: r.name,
    dataNascimento: r.dateOfBirth,
    sexo: r.gender
  });
  console.log('Parsed person:', person);
  return person;
}

// to avoid breaking the rest of our app
// I extract the id from the person url
function extractId(personData:any){
  let extractedId = personData.url.replace('http://localhost:8080/users/','').replace('/','');
  return parseInt(extractedId);
}

function mapPerson(response:Response): Person{
   // toPerson looks just like in the previous example
   return toPerson(response.json());
}