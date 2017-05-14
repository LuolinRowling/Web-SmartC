/**
 * 设备service类
 */
import { User } from '../entity/user.entity'

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Md5 } from "ts-md5/dist/md5";

@Injectable()

export class UserService {
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	login(username: string,password: string): Promise<any>{
		let options = new RequestOptions({headers: this.getHeaders()});
		let url = 'http://192.168.1.105:8080/login';
		//let url = '/login';login
		let user = {
			"username":username,
	    	"password":Md5.hashStr(password).toString()
		}
	    // let data = {
	    // 	"user":user
	    // }
	    return this.http      
	      .post(url, JSON.stringify(user), options)
	      .toPromise()
	      .then(response => response.json().data)
	      .catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
	  	console.error('An error occurred', error); // for demo purposes only
	  	return Promise.reject(error.message || error);
	}
	private getHeaders(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}