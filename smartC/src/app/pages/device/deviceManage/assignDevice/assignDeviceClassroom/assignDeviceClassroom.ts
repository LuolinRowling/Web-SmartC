import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { Device } from '../../../../../entity/device.entity';
import { DeviceClass } from '../../../../../entity/deviceclass.entity';
import { Camera } from '../../../../../entity/camera.entity';
import { Computer } from '../../../../../entity/computer.entity';
import { Raspberry } from '../../../../../entity/raspberry.entity';
import { Projector } from '../../../../../entity/projector.entity';
import { Singlechip } from '../../../../../entity/singlechip.entity';
import { Building } from '../../../../../entity/building.entity';
import { Classroom } from '../../../../../entity/classroom.entity';

import { DeviceService } from '../../../../../service/device.service';

import { nameValidator,numValidator } from '../../../../../providers/validator';

// declare var DataTable:any;

declare var $:any;

@Component({
  selector: 'page-assign-device-classroom',
  templateUrl: './assignDeviceClassroom.html'
})

export class assignDeviceClassroomPage implements OnInit{
  	//list
    computers : Computer[];
    cameras : Camera[];
    raspberrys : Raspberry[];
    projectors : Projector[];
    singlechips : Singlechip[];

    buildings : Building[];
    classrooms : Classroom[];

    id : any;
    //
    assignModel = {
        buildingNum:'',
        classroomNum:'',
        computerTypeId: 0,
        cameraTypeId:0,
        projectorTypeId:0,
        raspberryTypeId:0,
        singlechipTypeId:0
    }
    MaxInputs : number = 4;
    currentLen : number = 1;
    items : any[] = [];
    inputs : any[] = [];
    //判断添加还是修改
    operate = 'add';
    //消息提示
    judgeMsg = ['信息输入不合法！','该教室已分配设备！','该教室不存在！','添加成功！','修改成功！','添加失败！','修改失败！']
    judgeTip = true;
    tip = '';

  	constructor(
  		private deviceService: DeviceService,
      private router: Router,
      private _routeParams: ActivatedRoute) {
        _routeParams.params.subscribe(params=>{
          this.id =params['id'];
        });
        
  	} 
  	
  	/**
  	 * [getDeviceList 获取设备型号列表]
  	 */
  	getDeviceList(): void {
  		this.deviceService.getDeviceList().then(data=>{
			  this.computers = data.computerTypeList;
        this.cameras = data.cameraTypeList;
        this.projectors = data.projectorTypeList;
        this.raspberrys = data.raspberryTypeList;
        this.singlechips = data.singleChipTypeList;
        this.buildings = data.buildingList;
        this.classrooms = data.classroomList;

        if(this.cameras.length>0) {this.assignModel.cameraTypeId = this.cameras[0].cameraTypeId;}
        //给教室分配设备初始化
        if(this.id == null){
          this.initAdd();
        }else{
          this.initEdit();
        }
  		});
  	}

    initAdd(): void{
      this.items.length = 1;
      this.operate = 'add';
      if(this.buildings.length>0) {this.assignModel.buildingNum = this.buildings[0].buildingNum;}
      if(this.classrooms.length>0) {this.assignModel.classroomNum = this.classrooms[0].classroomNum;}
      if(this.computers.length>0) {this.assignModel.computerTypeId = this.computers[0].computerTypeId;}
      if(this.cameras.length>0) {this.assignModel.cameraTypeId = this.cameras[0].cameraTypeId;}
      if(this.projectors.length>0) {this.assignModel.projectorTypeId = this.projectors[0].projectorTypeId;}
      if(this.raspberrys.length>0) {this.assignModel.raspberryTypeId = this.raspberrys[0].raspberryTypeId;}
      if(this.singlechips.length>0) {this.assignModel.singlechipTypeId = this.singlechips[0].singlechipTypeId;}
    }

    initEdit(): void{
      this.operate = 'edit';
      this.getDeviceClassroomById();

    }

    getDeviceClassroomById(): void{
      this.deviceService.getDeviceClassroomById(this.id).then(data=>{
        console.log(data);
        let deviceClassroom = data.deviceInfo;
        if(data.judge!=0){
          this.judgeTip = false;
          this.tip = this.judgeMsg[2];
        }else{
          this.assignModel.buildingNum = deviceClassroom.buildingNum; 
          this.assignModel.classroomNum = deviceClassroom.classroomNum; 
          this.assignModel.computerTypeId = deviceClassroom.computerTypeId; 
          //this.assignModel.cameraTypeId = deviceClassroom.cameraTypeId; 
          this.assignModel.projectorTypeId = deviceClassroom.projectorTypeId; 
          this.assignModel.raspberryTypeId = deviceClassroom.raspberryTypeId; 
          this.assignModel.singlechipTypeId = deviceClassroom.singlechipTypeId; 
          this.items = deviceClassroom.cameraList;
          this.currentLen = this.items.length;
        }
      });
    }
    /**
     * [changeClassroomByBuilding 根据选择的教学楼重新获取教室号]
     * @param {[type]} _event [点击事件]
     */
    changeClassroomByBuilding(_event): void{
      console.log(_event);
      this.deviceService.changeClassByBuildName(_event).then(classrooms => {
        this.classrooms = classrooms;
        this.assignModel.classroomNum = classrooms[0].classroomNum;
      });
    }
    

    getInputCameraList(): Camera[]{
      let cameraList:Camera[] = [];
      
      $('.add-camera').each(function(i, obj){
        let camera:Camera={cameraId : null,cameraTypeId : null,cameraStatus : null,cameraAngle : '',cameraTypeName:''};
        let cameraAngle = $(this).find('.camera-angle').val();
        let cameraTypeId = $(this).find('.camera-type').val();
        if(nameValidator(cameraAngle)){
          camera.cameraAngle = cameraAngle;
          camera.cameraTypeId = cameraTypeId;
          cameraList.push(camera);
        }
            
      });
      return cameraList;
    }

    assignClassroomDevice():void{
      let cameraList:Camera[] = this.getInputCameraList();
      if(cameraList.length<1){
        this.judgeTip = false;
        this.tip = this.judgeMsg[0];
      }else{
        this.deviceService.assignClassroomDevice(this.operate,null,this.assignModel,cameraList).then(data=>{
           console.log(data);
        })
      }
    }

   

    /**
     * [addInput 添加输入框]
     * @return {boolean} [description]
     */
    addInput(): void{
      console.log(this.currentLen);
      if(this.currentLen <= this.MaxInputs) //max input box allowed
      {
          this.items[this.currentLen] = {cameraId : null,cameraTypeId : this.assignModel.cameraTypeId,cameraStatus : null,cameraAngle : '',cameraTypeName:''}
          this.currentLen ++;          
          this.items.length = this.currentLen; 

      }
        //return false;
    }
    /**
     * [removeInput 移除输入框]
     * @param  {[type]}  i      [description]
     * @param  {[type]}  _event [description]
     * @return {boolean}        [description]
     */
    removeInput(i,_event): boolean{
      console.log(i);
      if( this.currentLen>1 ) {
            this.currentLen--;
            this.items.splice(i,1);     
        }
        return false;
    }

  	ngOnInit(): void{
  		this.getDeviceList();
  	}
}