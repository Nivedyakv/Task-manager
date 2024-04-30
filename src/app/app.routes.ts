import { Routes } from '@angular/router';


export const routes: Routes = [
     {path:'',loadComponent: () =>
        import('./components/login/login.component').then(
            (c) => c.LoginComponent)
    },
    
    {path:'dashboard',loadComponent: () =>
    import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,)
     },
    // {
    //     path:'dashboard',component:DashboardComponent
    // },
     {
        path:'addtask',loadComponent:()=>
            import('./components/add-task/add-task.component').then(
                (c) => c.AddTaskComponent)
     },

    {path:'signup',loadComponent:()=>
        import('./components/signup/signup.component').then(
            (c) => c.SignupComponent)
    },
    {
        path:'profile',loadComponent:()=>
            import('./components/userprofile/userprofile.component').then(
                (c) => c.UserprofileComponent)
    },
    {
        path:'view',loadComponent:()=>
            import('./components/view-task/view-task.component').then(
                (c) => c.ViewTaskComponent)
    }
];

// canActivate:[authGuard]