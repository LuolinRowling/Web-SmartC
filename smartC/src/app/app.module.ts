import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MAINMENU_ROUTES } from './app.router';
import { RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './custom-option';
import { ToastOptions } from 'ng2-toastr';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login';
import { NavComponent } from './pages/navigation/navigation';
import { SidebarComponent } from './pages/sidebar/sidebar';


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

import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';
import { DeviceService } from './service/device.service';
import { VideoService } from './service/video.service';
import { MessageService } from './service/message.service';
import { RoleService } from './service/role.service';
import { BuildClassService } from './service/buildClass.service';
import { ToastService } from './service/toast.service';

import { Constant } from './common/constant'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavComponent,
    LoginPage,
    deviceMonitorPage,
    videoManagePage,
    videoLivePage,
    userManagePage,
    roleManagePage,
    buildClassManagePage,
    addBuildClassPage,
    deviceInfoPage,
    assignDevicePage,
    assignDeviceClassroomPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    //CONST_ROUTING,
    DataTableModule,
    RouterModule.forRoot(MAINMENU_ROUTES),
    Ng2Bs3ModalModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    {provide: ToastOptions, useClass: CustomOption},
    StorageService,
    UserService,
    DeviceService,
    VideoService,
    MessageService,
    RoleService,
    BuildClassService,
    Constant,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
