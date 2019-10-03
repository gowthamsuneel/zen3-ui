import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { UserDetailComponent }  from './user-detail/user-detail.component';
import { UsersComponent }      from './users/users.component';
import { UserService }  from './user.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    
  ],
  providers:[UserService],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
