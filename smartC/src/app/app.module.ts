import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MAINMENU_ROUTES } from './app.router';
import { RouterModule } from '@angular/router';
import {DataTableModule} from "angular2-datatable";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login';
import { NavComponent } from './pages/navigation/navigation';
import { SidebarComponent } from './pages/sidebar/sidebar';


import { deviceMonitorPage } from './pages/device/deviceMonitor/deviceMonitor';
import { videoManagePage } from './pages/video/videoManage/videoManage';
import { videoMultiPullPage } from './pages/video/videoManage/videoMultiPull/videoMultiPull';

import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';
import { DeviceService } from './service/device.service';
import { VideoService } from './service/video.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavComponent,
    LoginPage,
    deviceMonitorPage,
    videoManagePage,
    videoMultiPullPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    //CONST_ROUTING,
    DataTableModule,
    RouterModule.forRoot(MAINMENU_ROUTES),
    Ng2Bs3ModalModule
  ],
  providers: [
    StorageService,
    UserService,
    DeviceService,
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
