/**
 * 设备service类
 */
import { Device } from '../entity/device.entity';
import { Building } from '../entity/building.entity';
import { Classroom } from '../entity/classroom.entity';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class VideoService {
	private videoUrl = 'api/videos';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }
	
	  /**
     * [getPushingBuildClass 获取正在推流的教学楼和教室]
     * @return {Promise<any>} [教学楼列表 以及 第一个教学楼写的教室列表]
     */
  	getPushingBuildClass(): Promise<any> {
    	return this.http.get('/ajax_get_push_building')
             .toPromise()
             .then(response => response.json().data)
             .catch(this.handleError);
  	}

    changeClassByBuildName(name): Promise<Classroom[]> {
      let data = {
        "name": name
      };
      return this.http
              .post('/ajax_get_classroom_by_building',JSON.stringify(data),{headers: this.headers})
              .toPromise()
              .then(response => response.json().data.classroomList as Classroom[])
              .catch(this.handleError);
    }
  	

    /**
     * [operateAllDevice 一键操作所有设备]
     * @param {[type]} operate [操作类型 open close]
     */
    operateAllDevice(operate): void{
      let url = '/ajax_edit_all_device_status';
      let data = {
        "operation":operate
      }
      this.commonOperatFunc(url,data);
    }



    /**
     * [commonOperatFunc 公共方法]
     * @param {[type]} url  [访问地址]
     * @param {[type]} data [传输数据]
     */
    commonOperatFunc(url,data): void{
      console.log(data);
      this.http
        .post(url, JSON.stringify(data), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}