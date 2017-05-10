import { Component, OnInit } from '@angular/core';

import { Device } from '../../../entity/device.entity';
import { Camera } from '../../../entity/camera.entity';
import { DeviceService } from '../../../service/device.service';

// declare var DataTable:any;
// declare var $:any;

@Component({
  selector: 'page-device-monitor',
  templateUrl: './deviceMonitor.html'
})
export class deviceMonitorPage implements OnInit{
  	data : Device[];	
  	public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";


  	//@ViewChild('table') el:ElementRef;
  	constructor(
  		private deviceService: DeviceService) {
  	} 
  	
  	/**
  	 * [getDevices 获取设备列表]
  	 */
  	getDevices(): void {
  		this.deviceService.getDevices().then(devices => {
			this.data = devices;
  		});
  	}
  	/**
  	 * [operateDevice 操作设备状态]
  	 * @param {[type]} id      [设备ID]
  	 * @param {[type]} device  [设备 computer projector]
  	 * @param {[type]} operate [操作 open close]
  	 * @param {[type]} _event  [点击事件]
  	 */
  	operateDevice(id,device,operate,_event): void{
  		console.log(_event);
  		this.deviceService.operateDevice(id,device,operate);
  	}
  	/**
  	 * [operateCamera 操作摄像头状态]
  	 * @param {[type]} id       [设备ID]
  	 * @param {[type]} cameraId [摄像头ID]
  	 * @param {[type]} device   [设备]
  	 * @param {[type]} operate  [操作 open close]
  	 */
  	operateCamera(id,cameraId,device,operate): void{
  		this.deviceService.operateCamera(id,cameraId,operate);
  	}
  	
  	/**
  	 * [editAllDevice 操作全部设备]
  	 * @param {[type]} operate [description]
  	 */
  	editAllDevice(operate): void{
  		this.deviceService.operateAllDevice(operate);
  	}

  	ngOnInit(): void{
  		this.getDevices();
  	}
}