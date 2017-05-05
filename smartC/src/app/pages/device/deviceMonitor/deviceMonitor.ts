import { Component, OnInit,ElementRef,Renderer2,ViewChild } from '@angular/core';

import { Device } from '../../../entity/device.entity';
import { Camera } from '../../../entity/camera.entity';
import { DeviceService } from '../../../service/device.service';

declare var DataTable:any;
declare var $:any;

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


  	@ViewChild('table') el:ElementRef;
  	constructor(
  		private deviceService: DeviceService,
  		private elementRef: ElementRef) {
  	} 
  	
  	/**
  	 * [getDevices 获取设备列表]
  	 */
  	getDevices(): void {
  		this.deviceService.getDevices().then(devices => {
			this.data = devices;
  		});
  	}
  	
  	operateDevice(id,device,operate): void{
  		this.deviceService.operateDevice(id,device,operate);
  	}
  	
  	operateCamera(id,cameraId,device,operate): void{
  		this.deviceService.operateCamera(id,cameraId,operate);
  	}
  	
  	ngOnInit(): void{
  		this.getDevices();
  	}
}