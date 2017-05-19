import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser'

//entity
import { BuildClass } from '../../../../entity/buildclass.entity';

//service
import { BuildClassService } from '../../../../service/buildClass.service';

declare var $:any;

@Component({
  selector: 'page-add-buildclass',
  templateUrl: './addBuildClass.html'
})
export class addBuildClassPage implements OnInit{
	
  	buildClasses : BuildClass[];
  	MaxInputs : number = 9;
	InputsWrapper : any = $('#inputWrapper');
	x : number = this.InputsWrapper.length;
	items : any[] = [];
	inputs : any[] = [];
	FieldCount : number =1 ;
	addHtml : string = '';

    
	constructor(
		private _sanitizer: DomSanitizer,	  	
		private buildClassService: BuildClassService,
	  	private router: Router) {
	}

	getBuildClasses(): void{

	}
	ngOnInit(): void{
		this.getBuildClasses();
	}

	addBuildCLass(): void{
		var buildingNum = $('#inputBuilding').val();
	    var classroomNums = [];
	    $('.inputClassroom').each(function(i, obj){
	        classroomNums.push($(this).val());
	    });
	    console.log(classroomNums);
	    console.log(buildingNum);
	}

	addInput(): boolean{
		console.log(this.x);
		if(this.x <= this.MaxInputs) //max input box allowed
	    {
	        this.FieldCount++; //text box added increment
	        //add input box 
	        
	        this.x++;
	        this.items.length = this.x;
	    }
	    return false;
	}

	removeInput(i,_event): boolean{
		console.log(_event);

		if( this.x >= 1 ) {
	        _event.toElement.parentElement.remove(); //remove text box
	        this.x--; //decrement textbox
	        //this.items.splice(this.x-i,1);
	    }
	    return false;
	}



}