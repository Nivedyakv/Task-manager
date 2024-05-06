import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { PiechartComponent } from './components/piechart/piechart.component';
import { canActivateTeam } from './core/Guards/auth.guard';


export const routes: Routes = [
     {path:'',loadComponent: () =>
        import('./components/login/login.component').then(
            (c) => c.LoginComponent)
    },
    
    {path:'dashboard',canActivate:[canActivateTeam],   loadComponent: () =>
    import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,)
     },
   
     {
        path:'addtask',canActivate:[canActivateTeam], loadComponent:()=>
            import('./components/add-task/add-task.component').then(
                (c) => c.AddTaskComponent)
     },

    {path:'signup',loadComponent:()=>
        import('./components/signup/signup.component').then(
            (c) => c.SignupComponent)
    },
    {
        path:'profile',canActivate:[canActivateTeam], loadComponent:()=>
            import('./components/userprofile/userprofile.component').then(
                (c) => c.UserprofileComponent)
    },
    {
        path:'view',canActivate:[canActivateTeam], loadComponent:()=>
            import('./components/view-task/view-task.component').then(
                (c) => c.ViewTaskComponent)
    },
    {path:'piechart',component:PiechartComponent,canActivate:[canActivateTeam], }
];

