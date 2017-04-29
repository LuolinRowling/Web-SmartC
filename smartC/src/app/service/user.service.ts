/**
 * 设备service类
 */
import { User } from '../entity/user.entity'

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Md5 } from "ts-md5/dist/md5";

@Injectable()

export class UserService {
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	login(username: string,password: string): Promise<any>{
		let url = 'api/user';
		//let url = '/login';
	    let data = {
	    	"username":username,
	    	"password":Md5.hashStr(password).toString()
	    }
	    return this.http      
	      //.post(url, JSON.stringify(data), {headers: this.headers})
	      .get(url)
	      .toPromise()
	      .then(response => response.json().data.data)
	      .catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
	  	console.error('An error occurred', error); // for demo purposes only
	  	return Promise.reject(error.message || error);
	}
}