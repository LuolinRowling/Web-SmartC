import { Component, OnInit } from '@angular/core';

import { Device } from '../../../entity/device.entity';
import { Classroom } from '../../../entity/classroom.entity';
import { Building } from '../../../entity/building.entity';
import { BuildClass } from '../../../entity/buildclass.entity';
import { ZNode } from '../../../entity/znode.entity';

import { DeviceService } from '../../../service/device.service';
import { VideoService } from '../../../service/video.service';

import 'ztree';
declare var $:any;

@Component({
  selector: 'page-video-manage',
  templateUrl: './videoManage.html'
})
export class videoManagePage implements OnInit{
	data : Device[] = [];
	buildings : Building[];
	classrooms : Classroom[];
	buildclasses : BuildClass[];

	public filterQuery = "";
    public rowsOnPage = 10;
    public sortOrder = "asc";

    judgeFrom: boolean = true;
    buildModel: string;
    classModel: string;

    //zTree
    setting :any = {
	    check: {
	        enable: true
	    },
	    data: {
	        simpleData: {
	            enable: true
	        }
	    }
	};
	zNodes: any = [
    { id: 1, pId: 0, name: "父节点1 - 展开", open: true },
    { id: 11, pId: 1, name: "父节点11 - 折叠" },
    { id: 111, pId: 11, name: "叶子节点111" },
    { id: 112, pId: 11, name: "叶子节点112" },
    { id: 113, pId: 11, name: "叶子节点113" },
    { id: 114, pId: 11, name: "叶子节点114" },
    { id: 12, pId: 1, name: "父节点12 - 折叠" },
    { id: 121, pId: 12, name: "叶子节点121" },
    { id: 122, pId: 12, name: "叶子节点122" },
    { id: 123, pId: 12, name: "叶子节点123" },
    { id: 124, pId: 12, name: "叶子节点124" },
    { id: 13, pId: 1, name: "父节点13 - 没有子节点", isParent: true },
    { id: 2, pId: 0, name: "父节点2 - 折叠" },
    { id: 21, pId: 2, name: "父节点21 - 展开", open: true },
    { id: 211, pId: 21, name: "叶子节点211" },
    { id: 212, pId: 21, name: "叶子节点212" },
    { id: 213, pId: 21, name: "叶子节点213" },
    { id: 214, pId: 21, name: "叶子节点214" },
    { id: 22, pId: 2, name: "父节点22 - 折叠" },
    { id: 221, pId: 22, name: "叶子节点221" },
    { id: 222, pId: 22, name: "叶子节点222" },
    { id: 223, pId: 22, name: "叶子节点223" },
    { id: 224, pId: 22, name: "叶子节点224" },
    { id: 23, pId: 2, name: "父节点23 - 折叠" },
    { id: 231, pId: 23, name: "叶子节点231" },
    { id: 232, pId: 23, name: "叶子节点232" },
    { id: 233, pId: 23, name: "叶子节点233" },
    { id: 234, pId: 23, name: "叶子节点234" },
    { id: 3, pId: 0, name: "父节点3 - 没有子节点", isParent: true }
  ];
	code: any;
	nodeHead: ZNode;
	node :ZNode;

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
  		this.judgeFrom = true;
  		this.videoService.getPushingBuildClass().then(
  			data => {
  				this.classrooms = data.classroomList;  				
  				this.buildings = data.buildingList;
  				if(from == 'multiple'){
  					//获取可以拉流的教学楼教室列表
  					this.getMultiPullStreamTree();
  				}
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

  	getMultiPullStreamTree(): void{
  		this.videoService.getMultiPullStreamTree().then(buildclasses => {
  			this.buildclasses = buildclasses;
  			this.zNodes = new Array();
            //console.log(msg.data[0]['buildingNum']);
            let buildNum = "";
            let count = 0;
            let countChild = 1;
            //{ id:1, pId:0, name:"设备管理", open:true, icon:"../dist/img/computer.png"}
            for (let i=0;i<buildclasses.length;i++){
                //let nodeHead: ZNode = null;
                // if(buildclasses[i]['buildingNum']!=buildNum){
                //     count++;
                //     this.nodeHead.id = count;
                //     this.nodeHead.pId = 0;
                //     this.nodeHead.name = buildclasses[i]['buildingNum'];
                //     this.nodeHead.open = true;
                //     this.nodeHead.icon = "../dist/img/roll.png";
                //     this.zNodes.push(this.nodeHead);
                //     //let node: ZNode = null;
                //     this.node.id = count*10+countChild;
                //     this.node.pId = count;
                //     this.node.name = buildclasses[i]['classroomNum'];
                //     this.node.icon = "../dist/img/roll.png";
                //     this.zNodes.push(this.node);
                //     countChild++;
                //     buildNum = buildclasses[i]['buildingNum'];
                // }else{
                //     //let node: ZNode = null;
                //     this.node.id = count*10+countChild;
                //     this.node.pId = count;
                //     this.node.name = buildclasses[i]['classroomNum'];
                //     this.node.icon = "../dist/img/roll.png";
                //     this.zNodes.push(this.node);
                //     countChild++;
                // }
            }
            this.judgeFrom = false;
            $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
            this.setCheck();
            $("#py").bind("change", this.setCheck);
            $("#sy").bind("change", this.setCheck);
            $("#pn").bind("change", this.setCheck);
            $("#sn").bind("change", this.setCheck);
  		});
  	}

  	/**
  	 * zTree
  	 */
  	setCheck(): void {
	    var zTree = $.fn.zTree.getZTreeObj("ztree"),
	        type = { "Y" : "ps", "N" : "ps" };
	    zTree.setting.check.chkboxType = type;
	    this.showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "' + type.N + '" };');
	}
	showCode(str): void {
	    if (!this.code) this.code = $("#code");
	    this.code.empty();
	    this.code.append("<li>"+str+"</li>");
	}
	/**
	 * [GetCheckedAll 获取所有选中节点的值]
	 */
	GetCheckedAll() :void{
	    let treeObj = $.fn.zTree.getZTreeObj("ztree");
	    let nodes = treeObj.getCheckedNodes(true);
	    let buildClassNodes = new Array();
	    let buildingNum = '';
	    for (let i = 0; i < nodes.length; i++) {
	        let buildClass : BuildClass;

	        if(nodes[i].pId==null){
	            //buildClass.buildingNum = nodes[i].name;
	            buildingNum = nodes[i].name;
	        }else{
	            //buildClass.buildingNum = buildingNum;
	            //buildClass.classroomNum = nodes[i].name;
	            buildClassNodes.push(buildingNum+";"+nodes[i].name);
	        }

	        //msg += nodes[i].name+"--"+nodes[i].id+"--"+nodes[i].pId+"\n";

	    }
	    //console.log(buildClassNodes);
	    this.startMultiplePullOperate(buildClassNodes);
	}

	/**
	 * [startMultiplePullOperate 操作多个教室拉流]
	 * @param {[type]} pullList [被选中的需要拉流教室的列表]
	 */
	startMultiplePullOperate(pullList): void{

	}
  	ngOnInit(): void{
  		this.getDevices();
  	}
}