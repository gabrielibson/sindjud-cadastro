import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersService } from './users.service';
import { MaterialModule } from './material/material.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  MaterialModule, 
                  BrowserAnimationsModule,
                  TextMaskModule,
                  HttpModule
                  ],
  declarations: [ AppComponent, UsersFormComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UsersService]
})
export class AppModule { }
