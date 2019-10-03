import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UsersComponent }      from './users/users.component';
import { UserDetailComponent }  from './user-detail/user-detail.component';

const routes: Routes = [
  
  { path: 'detail/:id', component: UserDetailComponent },
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
