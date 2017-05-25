import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Device } from '../../../../entity/device.entity';
import { DeviceClass } from '../../../../entity/deviceclass.entity';

import { DeviceService } from '../../../../service/device.service';

import { nameValidator,numValidator } from '../../../../providers/validator';

// declare var DataTable:any;

// declare var $:any;

@Component({
  selector: 'page-assign-device',
  templateUrl: './assignDevice.html'
})

export class assignDevicePage implements OnInit{
  	//list
    data : DeviceClass[];
    id : number;
    
  	constructor(
  		private deviceService: DeviceService,
      private router: Router) {
  	} 
  	
  	/**
  	 * [getDeviceTypes 获取设备型号列表]
  	 */
  	getDeviceTypes(): void {
  		this.deviceService.getAssignDevices().then(data=>{
			  this.data = data;
        
  		});
  	}

    getDeviceClassroomId(id): void{
      this.id = id;
    }

    deleteDeviceClassroom(): void{
      
    }

  	ngOnInit(): void{
  		this.getDeviceTypes();
  	}
}