import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersService } from './services/users.service';
import { MaterialModule } from './material/material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { CodeConfirmComponent } from './code-confirm/code-confirm.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  MaterialModule, 
                  BrowserAnimationsModule,
                  TextMaskModule,
                  HttpModule,
                  AppRoutingModule,
                  RecaptchaModule.forRoot(),
                  ],
  declarations: [ AppComponent, UsersFormComponent, CodeConfirmComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UsersService,  {
    provide: RECAPTCHA_SETTINGS,
    useValue: { 
      siteKey: '6LfS2ToUAAAAAMb4wQhvcXkbZu_3KnD21Go1sX39',
    },
  },
],
})
export class AppModule { }
