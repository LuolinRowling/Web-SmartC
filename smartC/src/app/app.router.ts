import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from "./pages/login/login";

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginPage }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);