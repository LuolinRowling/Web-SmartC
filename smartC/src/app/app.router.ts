import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from "./pages/login/login";
import { SidebarComponent } from './pages/sidebar/sidebar';
import { NavComponent } from './pages/navigation/navigation';
import { deviceMonitorPage } from './pages/device/deviceMonitor/deviceMonitor';
import { videoManagePage } from './pages/video/videoManage/videoManage';

const MAINMENU_ROUTES: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/videoManage', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'deviceMonitor', component: deviceMonitorPage },
    { path: 'videoManage', component: videoManagePage },
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);