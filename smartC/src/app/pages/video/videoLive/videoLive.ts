import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from "@angular/router";
import { Location }     from '@angular/common';

import { VideoService } from '../../../service/video.service';
import { DeviceService } from '../../../service/device.service';


import { Device } from '../../../entity/device.entity';
import { Camera } from '../../../entity/camera.entity';

declare var jwplayer: any;
declare var cyberplayer: any;

@Component({
	selector: 'page-video-live',
	templateUrl: './videoLive.html'
})

export class videoLivePage implements OnInit {
	
	address : string = null;
	id : any;
	cameras : Camera[];
	device : Device;
	cameraCode : number = 0;

	constructor(
		private route: ActivatedRoute,
		private videoService: VideoService,
		private deviceService: DeviceService) {}

	/**
	 * [getPullAddress 获取视频播放地址]
	 * @param {[type]} cameraId [摄像头ID]
	 */
	getPullAddress(cameraId): void{
		console.log(cameraId);
		this.getCode(cameraId);
		this.videoService.getPullAddress(this.id,this.cameraCode).then(
			data=>{
    		if(data.judge == 0){
    			this.address = data.address;
    			console.log(this.address);
    			this.getLineVedio(this.address);
    		}
    	})
	}

	/**
	 * [InitDeviceAddress 进入页面初始化设备信息以及获取地址]
	 */
	InitDeviceAddress(): void{
		this.deviceService.getDeviceInfoById(this.id).then(device => {
			this.device = device;
			this.cameras = device.cameraList;
			if(this.address == null&&this.cameras.length>0){
				this.getPullAddress(this.cameras[0].cameraId)
			}
		})
	}

	/**
    * [getLineVedio 根据地址进行视频直播]
    * @param {[string]} url [视频地址]
    */
    getLineVedio(url): void{
  //     	var player = jwplayer('playerVideoBox').setup({
		//     /*flashplayer: 'js/plugins/mediaplayer-5.7/player.swf',*/
		//     file : url,
		//     width : '100%',
		//     height : '100%',
		//     fallback : 'false',
		//     autostart : 'true',
		//     primary : 'flash',
		//     rtmp : {
		//         bufferlength : 0.1
		//     }
		// });
		var player = cyberplayer("playerVideoBox").setup({
			width: "100%",
			height: 370,
			stretching: "uniform",
			file: url,
			autostart: true,
			repeat: false,
	        volume: 100,
	        controls: true,
	        isLive: true,
	        rtmp: {
	            reconnecttime: 10,
	            bufferlength: 1
	        },
			ak: 'ba77daba024d4bbe91fda6da0d600352' // 公有云平台注册即可获得accessKey
		});
	}

	/**
	 * [directorCamera description]
	 * @param {[type]} direction [description]
	 */
	directorCamera(direction): void{
		this.videoService.directorCamera(this.id,this.cameraCode,direction);
	}

	/**
	 * [getCode 根据摄像头ID获取对应的code]
	 * @param {[type]} cameraId [摄像头ID]
	 */
	getCode(cameraId): void{
		let i = 1;
		for(let camera of this.cameras){
			if(camera.cameraId == cameraId){
				this.cameraCode = i;
				break;
			}
			i++;
		}
	}
	ngOnInit(): void{
        this.route.queryParams.subscribe((data: any) => {
    		this.id = data.id;
	    })
	    this.InitDeviceAddress();
	}
}