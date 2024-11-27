import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { EmployeesComponent } from './employeesOnLeave/employees.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllemployeesComponent } from './allemployees/allemployees.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('./employeesOnLeave/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'allemployees',
        loadChildren: () => import('./allemployees/allemployees.module').then(m => m.AllemployeesModule)
      },
      {
        path: 'demand',
        loadChildren: () => import('./demand/demand.module').then(m => m.DemandModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },

      
    ]
  },


    {path:'login',component:LoginComponent},

    {path:'register',component:RegisterComponent},

];
