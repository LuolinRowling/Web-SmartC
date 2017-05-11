/**
 * 设备service类
 */
import { Device } from '../entity/device.entity';
import { Building } from '../entity/building.entity';
import { Classroom } from '../entity/classroom.entity';
import { BuildClass } from '../entity/buildclass.entity';

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

    /**
     * [changeClassByBuildName 根据选择的教学楼重新获取教室号]
     * @param  {[string]}               name [教学楼名]
     * @return {Promise<Classroom[]>}      [教室列表]
     */
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
     * [getMultiPullStreamTree 获取可以拉流的教学楼教室列表]
     * @return {Promise<BuildClass[]>} [教学楼教室列表]
     */
    getMultiPullStreamTree(): Promise<BuildClass[]>{
      return this.http
              .post('/ajax_multi_pull_stream_tree',{headers: this.headers})
              .toPromise()
              .then(response => response.json().data.buildClassList as BuildClass[])
              .catch(this.handleError);
    }

    /**
     * [startMultiplePullOperate 操作多个教室拉流]
     * @param  {[type]}       inputBuilding  [选择的教学楼]
     * @param  {[type]}       inputClassroom [选择的教室]
     * @param  {[type]}       pullList       [需要拉流的多个教室列表]
     * @return {Promise<any>}                []
     */
    startMultiplePullOperate(inputBuilding,inputClassroom,pullList): Promise<any>{
      let url = '/ajax_multiple_pull_stream_status';
      let data = {
        "buildingNum":inputBuilding,
        "classroomNum":inputClassroom,
        "pullList":pullList
      };
      return this.commonOperatFunc(url,data);
    }

    /**
     * [startPullOperate 操作单个教室拉流]
     * @param  {[type]}       inputBuilding  [选择的教学楼]
     * @param  {[type]}       inputClassroom [选择的教室]
     * @param  {[type]}       pullId         [设备ID]
     * @return {Promise<any>}                []
     */
    startPullOperate(inputBuilding,inputClassroom,pullId): Promise<any>{
      let url = '/ajax_pull_stream_status';
      let data = {
        "buildingNum":inputBuilding,
        "classroomNum":inputClassroom,
        "did":pullId
      };
      return this.commonOperatFunc(url,data);
    }


    /**
     * [commonOperatFunc 公共方法]
     * @param {[type]} url  [访问地址]
     * @param {[type]} data [传输数据]
     */
    commonOperatFunc(url,data): Promise<any>{
      console.log(data);
      return this.http
        .post(url,JSON.stringify(data),{headers: this.headers})
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}