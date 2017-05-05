import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CONST_ROUTING } from './app.router'

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login';
import { NavComponent } from './pages/navigation/navigation';
import { SidebarComponent } from './pages/sidebar/sidebar';

import { deviceMonitorPage } from './pages/device/deviceMonitor/deviceMonitor';
import { videoManagePage } from './pages/video/videoManage/videoManage';

import { StorageService } from './service/storage.service';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavComponent,
    LoginPage,
    deviceMonitorPage,
    videoManagePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CONST_ROUTING
  ],
  providers: [
    StorageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
