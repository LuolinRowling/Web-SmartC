import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { Constant } from '../common/constant';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class RoleService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private roleUrl: string;
	constructor(
		private constant: Constant,
		private http: Http) {
		this.roleUrl = constant.URL + 'roles/'}
	
	getRoles(): Promise<Role[]>{
		return this.http
			.get(this.roleUrl)
			.toPromise()
			.then(response => response.json().data.roleList as Role[])
			.catch(this.handleError)
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