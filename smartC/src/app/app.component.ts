import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './service/storage.service';

import { User } from './entity/user.entity'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	judgeLogin : boolean = false;
  constructor(private storageService: StorageService,
  			  private router: Router) {
  	let user = this.storageService.read<User>('user');
    if(user != null){
      	//this.router.navigate(['/deviceMonitor']);
    }
    else{
    	this.router.navigate(['/login']);
    }
  }
}
