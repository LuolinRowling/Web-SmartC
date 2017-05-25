import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from "./pages/login/login";
import { SidebarComponent } from './pages/sidebar/sidebar';
import { NavComponent } from './pages/navigation/navigation';
import { deviceMonitorPage } from './pages/device/deviceMonitor/deviceMonitor';
import { deviceInfoPage } from './pages/device/deviceManage/deviceInfo/deviceInfo';
import { assignDevicePage } from './pages/device/deviceManage/assignDevice/assignDevice';
import { assignDeviceClassroomPage } from './pages/device/deviceManage/assignDevice/assignDeviceClassroom/assignDeviceClassroom';
import { videoManagePage } from './pages/video/videoManage/videoManage';
import { videoLivePage } from './pages/video/videoLive/videoLive';
import { userManagePage } from './pages/settings/userManage/userManage';
import { roleManagePage } from './pages/settings/roleManage/roleManage';
import { buildClassManagePage } from './pages/settings/buildClassManage/buildClassManage';
import { addBuildClassPage } from './pages/settings/buildClassManage/addBuildClass/addBuildClass';


export const MAINMENU_ROUTES = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/videoManage', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'deviceMonitor', component: deviceMonitorPage },
    { path: 'videoManage', component: videoManagePage },
    { path: 'videoLive', component: videoLivePage },
    { path: 'userManage', component: userManagePage },
    { path: 'roleManage', component: roleManagePage },
    { path: 'buildClassManage', component: buildClassManagePage },
    { path: 'addBuildClass', component: addBuildClassPage },
    { path: 'deviceInfo', component: deviceInfoPage },
    { path: 'assignDevice', component: assignDevicePage },
    { path: 'assignDeviceClassroom', component: assignDeviceClassroomPage },
];
//export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);