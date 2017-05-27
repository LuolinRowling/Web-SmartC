import { Component, OnInit,ViewContainerRef } from '@angular/core';

import { Device } from '../../../entity/device.entity';
import { Camera } from '../../../entity/camera.entity';
import { DeviceService } from '../../../service/device.service';

import { ToastService } from '../../../service/toast.service';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

// declare var DataTable:any;
// declare var $:any;

@Component({
  selector: 'page-device-monitor',
  templateUrl: './deviceMonitor.html'
})
export class deviceMonitorPage implements OnInit{
  	data : Device[];	
  	device : Device;

  	constructor(
      private toastr: ToastsManager, 
      private vcr: ViewContainerRef,
      private deviceService: DeviceService,
  		private toastService: ToastService) {
      this.toastr.setRootViewContainerRef(vcr);
  	} 
  	

  	/**
  	 * [getDevices 获取设备列表]
  	 */
  	getDevices(): void {
  		this.deviceService.getDevices().then(devices => {
			  this.data = devices;
        //console.log(this.data);
  		});
  	}
  	/**
  	 * [operateDevice 操作设备状态]
     * @param {[type]} num     [数据编号] 
  	 * @param {[type]} id      [设备ID]
  	 * @param {[type]} device  [设备 computer projector]
  	 * @param {[type]} operate [操作 open close]
  	 * @param {[type]} _event  [点击事件]
  	 */
  	operateDevice(num,id,device,operate): void{
      console.log(num);
  		this.deviceService.operateDevice(id,device,operate).then(data=>{
        console.log(data);
        let message = data.wSocketMessage;
        //this.device = data.deviceInfo;
        this.data[num] = data.deviceInfo;
        this.handleMessage(message.judge,data.deviceInfo.buildingNum+data.deviceInfo.classroomNum,message.message);

      });
  	}
  	/**
  	 * [operateCamera 操作摄像头状态]
  	 * @param {[type]} id       [设备ID]
  	 * @param {[type]} cameraId [摄像头ID]
  	 * @param {[type]} code     [摄像头code]
  	 * @param {[type]} operate  [操作 open close]
  	 */
  	operateCamera(id,cameraId,code,operate): void{
      console.log(code);
  		this.deviceService.operateCamera(id,cameraId,code+1,operate).then(data=>{
        console.log(this.data);
      });
  	}
  	
  	/**
  	 * [editAllDevice 操作全部设备]
  	 * @param {[type]} operate [description]
  	 */
  	editAllDevice(operate): void{
  		this.deviceService.operateAllDevice(operate).then(data=>{
        this.data = data.deviceInfoList
        console.log(data);
      });
  	}

    /**
     * [handleMessage 处理消息]
     * @param {[type]} type    [类型]
     * @param {[type]} title   [标题]
     * @param {[type]} message [消息内容]
     */
    handleMessage(type,title,message){
      console.log(type,title,message);
      switch (type) {
        case "success":
          this.toastService.showSuccess(this.toastr,title,message);
          break;
        case "fail":
          this.toastService.showError(this.toastr,title,message);
          break;
        case "offline":
          this.toastService.showWarning(this.toastr,title,message);
          break;
        default:
          // code...
          break;
      }
    }
  	ngOnInit(): void{
  		this.getDevices();
  	}
}