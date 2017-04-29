/**
 * 设备service类
 */
import { Message } from '../entity/message.entity'

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class MessageService {
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	getMessages(userId): Promise<Message[]>{
		let url = 'api/messages';
		//let url = '/login';
	    let data = {
	    	"userId":userId
	    }
	    return this.http      
	      //.post(url, JSON.stringify(data), {headers: this.headers})
	      .get(url)
	      .toPromise()
	      .then(response => response.json().data.data.messageListCenter as Message[])
	      .catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
	  	console.error('An error occurred', error); // for demo purposes only
	  	return Promise.reject(error.message || error);
	}
}