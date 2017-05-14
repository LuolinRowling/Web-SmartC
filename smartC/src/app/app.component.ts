import { Component,OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './service/storage.service';
import { MessageService } from './service/message.service';

import { User } from './entity/user.entity';
import { Message } from './entity/message.entity';

import { Observable } from 'rxjs/Rx';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	judgeLogin : boolean = false;
  dismissTime : number = 5000;
  user : User;
  messages : Message[];

  constructor(
          private storageService: StorageService,
  			  private router: Router,
          private messageService: MessageService,
          private toastr: ToastsManager, 
          private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  	this.user = this.storageService.read<User>('user');
    if(this.user != null){
      	//this.router.navigate(['/deviceMonitor']);
    }
    else{
    	this.router.navigate(['/login']);
    }
  }

  getMessage(t): void{
    console.log(t);
    this.messageService.getMessages(this.user.id).then(messages=>{
      this.messages = messages;
    })
  }

  showSuccess(title,message) {
    this.toastr.success('You are awesome!', 'Success!')
      .then((toast: Toast) => {
        setTimeout(() => {
            this.toastr.dismissToast(toast);
        }, this.dismissTime);
      });
  }

  showError(title,message) {
    this.toastr.error(message, title)
      .then((toast: Toast) => {
        setTimeout(() => {
            this.toastr.dismissToast(toast);
        }, this.dismissTime);
      });
  }

  showWarning(title,message) {
    this.toastr.warning(message, title)
      .then((toast: Toast) => {
        setTimeout(() => {
            this.toastr.dismissToast(toast);
        }, this.dismissTime);
      });
  }


  ngOnInit(): void{
    //this.showSuccess();
    // let timer = Observable.timer(2000,5000);
    // timer.subscribe(t=> {
    //     this.getMessage(t);
    // });

  }

}
