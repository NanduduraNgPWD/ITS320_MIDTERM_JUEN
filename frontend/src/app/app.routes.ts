import { Routes } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { authProtectedGuard } from './guards/auth-protected.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: SignupComponent, canActivate: [authGuard] },
    { path: 'home', component: HomeComponent, canActivate: [authProtectedGuard] },
    { path: 'todo', component: ToDoListComponent, canActivate: [authProtectedGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
