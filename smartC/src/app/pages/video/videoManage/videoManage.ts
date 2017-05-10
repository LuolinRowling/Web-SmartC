import { Component, OnInit } from '@angular/core';

import { Device } from '../../../entity/device.entity';
import { Classroom } from '../../../entity/classroom.entity';
import { Building } from '../../../entity/building.entity';

import { DeviceService } from '../../../service/device.service';
import { VideoService } from '../../../service/video.service';


@Component({
  selector: 'page-video-manage',
  templateUrl: './videoManage.html'
})
export class videoManagePage implements OnInit{
	data : Device[] = [];
	buildings : Building[];
	classrooms : Classroom[];

	public filterQuery = "";
    public rowsOnPage = 10;
    public sortOrder = "asc";

    judgeFrom: boolean = true;
    buildModel: string;
    classModel: string;

  	constructor(
  		private deviceService: DeviceService,
  		private videoService: VideoService) {
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
  	 * [operateStream 操作视频推拉流]
  	 * @param {[type]} id      [设备ID]
  	 * @param {[type]} operate [操作 start_push stop_push start_pull stop_pull start_broadcast stop_broadcast]
  	 * @param {[type]} _event  [点击事件]
  	 */
  	operateStream(id,operate,_event): void{
  		console.log(_event);
  		this.deviceService.operateStream(id,operate);
  	}

  	/**
  	 * [getBuildClass 获取正在推流的教学楼教室]
  	 * @param {[type]} id     [设备ID]
  	 * @param {[type]} _event [点击事件]
  	 * @param {[type]} from   [多个教室同时拉流：multiple 单个教室：single]
  	 */
  	getBuildClass(id,_event,from): void{
  		//把上一次选择的教学楼教室删除
  		this.buildModel = '';
  		this.classModel = '';
  		this.videoService.getPushingBuildClass().then(
  			data => {
  				this.classrooms = data.classroomList;  				
  				this.buildings = data.buildingList;
  			});
  	}

  	/**
  	 * [changeClassroomByBuilding 根据选择的教学楼重新获取教室号]
  	 * @param {[type]} _event [点击事件]
  	 */
  	changeClassroomByBuilding(_event): void{
  		console.log(_event);
  		this.videoService.changeClassByBuildName(_event).then(classrooms => this.classrooms = classrooms);
  	}

  	ngOnInit(): void{
  		this.getDevices();
  	}
}