import { Building } from '../entity/building.entity';
import { Classroom } from '../entity/classroom.entity';
import { BuildClass } from '../entity/buildclass.entity';

import { Constant } from '../common/constant';

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class BuildClassService {
	private headers = new Headers({'Content-Type': 'application/json'});
  private buildClassUrl: string;
  private options: any;
  constructor(private http: Http,private constant: Constant) {
    this.buildClassUrl = constant.URL+'buildingClassrooms/';
    this.options = new RequestOptions({headers: this.getHeaders()});
   }

  getBuildClasses(): Promise<BuildClass[]>{
    return this.http
      .get(this.buildClassUrl)
      .toPromise()
      .then(response=>response.json().data.buildingClassroomList as BuildClass[])
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