import { CodeConfirmComponent } from './code-confirm/code-confirm.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'usersForm', component: UsersFormComponent },
   // map '/' to '/usersForm' as our default route
   {
    path: '',
    redirectTo: '/usersForm',
    pathMatch: 'full'
  },
  {path: 'validarCadastro/:code',  component: CodeConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
