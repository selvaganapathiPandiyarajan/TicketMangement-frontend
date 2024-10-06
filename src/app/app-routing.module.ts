
import { RouterModule, Routes } from '@angular/router';
import { SignupdetailsComponent } from './signupdetails/signupdetails.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LogindetailsComponent } from './logindetails/logindetails.component'; 
import { ForgetPageComponent } from './forget-page/forget-page.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'signup', component:SignupdetailsComponent},
  {path:'login', component:LogindetailsComponent},
  {path:'user',component: EmployeeDashboardComponent},
  {path:'manager',component:ManagerDashboardComponent}, 
  {path:'forgetpage',component: ForgetPageComponent},
  {path:'supportteam',component:AdminDashboardComponent},  
  
  {
    path: '',
    loadComponent: () =>
      import('./logindetails/logindetails.component')
        .then(mod => mod.LogindetailsComponent)
  }
];

export default routes;
