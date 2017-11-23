import { UsersService } from './../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-code-confirm',
  templateUrl: './code-confirm.component.html',
  styleUrls: ['./code-confirm.component.css']
})
export class CodeConfirmComponent implements OnInit, OnDestroy {
  sub: any;
  cpf: string;
  code: string;
  submitted = false;
  msgError: string;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { 
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.code = params['code'];
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  validarCadastro(){
    this.usersService.activateUser(this.cpf, this.code).subscribe(
      r=> {
        console.log(r);
        this.submitted = true;
      },
      err => {
        this.msgError = err._body;
      }
      );
  }

  onSubmit(){
    this.validarCadastro();
  }

}
