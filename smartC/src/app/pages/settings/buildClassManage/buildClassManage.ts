import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//entity
import { BuildClass } from '../../../entity/buildclass.entity';

//service
import { BuildClassService } from '../../../service/buildClass.service';



@Component({
  selector: 'page-buildclass-manage',
  templateUrl: './buildClassManage.html'
})
export class buildClassManagePage implements OnInit{
	
  data : BuildClass[] = [];

	constructor(	  	
		private buildClassService: BuildClassService,
	  private router: Router) {
	}

  getBuildClasses(): void{
    this.buildClassService.getBuildClasses().then(data=>this.data = data);
  }
	ngOnInit(): void{
		this.getBuildClasses();
	}

}