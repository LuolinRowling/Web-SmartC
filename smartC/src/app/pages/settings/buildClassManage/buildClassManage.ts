import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//entity
import { BuildClass } from '../../../entity/buildclass.entity';

//service
import { BuildClassService } from '../../../service/buildClass.service';

import { nameValidator } from '../../../providers/validator';

@Component({
  selector: 'page-buildclass-manage',
  templateUrl: './buildClassManage.html'
})
export class buildClassManagePage implements OnInit{
	
  	data : BuildClass[] = [];
  	buildClass : BuildClass = {
  		b_id : null,
		building : {
			id : null,
			buildingNum : null
		},
		classroomNum : null,
		id : null//classroom id
  	};

  	judgeTips = {
	    edit: true,
	    delete : true //判断tip是否需要显示 true不需要
	}
	judgeMsg: string[] = ['请输入20字以下教学楼教室号！','请输入20字以下教学楼！','请输入20字以下教室号！','教室已存在！',
							'添加成功！','修改成功！','删除成功！',
							'添加失败！','修改失败！','删除失败！'];
	tip : string = '';

	constructor(	  	
		private buildClassService: BuildClassService,
	  	private router: Router) {
	}

	getBuildClasses(): void{
		this.buildClassService.getBuildClasses().then(data=>this.data = data);
	}

	editBuildClass(): void{
		let buildingNum = this.buildClass.building.buildingNum;
		let classroomNum = this.buildClass.classroomNum;
		if(nameValidator(buildingNum)&&nameValidator(classroomNum)){
			this.buildClassService.editBuildClass(this.buildClass).then(data=>{
				console.log(data);
				let judge = Math.abs(data.judge);
				if(judge == 0) {
					this.tip = this.judgeMsg[3];
					location.reload();
				}else if(judge == 9){
					this.tip = this.judgeMsg[6];
					location.reload();
				}else
					this.tip = this.judgeMsg[judge];
			})
		}else{
			this.tip = this.judgeMsg[0];
		}
		
	}

	deleteBuildClass(): void{
		this.buildClassService.deletebuildClass(this.buildClass.id).then(data=>{
			console.log(data);
		});
	}
	recordInfo(id,buildingNum,classroomNum): void{
		this.buildClass.id = id;
		this.buildClass.classroomNum = classroomNum;
		this.buildClass.building.buildingNum = buildingNum;
		//this.buildClass.building.id = id;
	}

	ngOnInit(): void{
		this.getBuildClasses();
	}

}