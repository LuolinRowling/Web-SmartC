/**
 * 设备service类
 */
import { Device } from '../entity/device.entity'

import { Constant } from '../common/constant';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class DeviceService {
	private deviceUrl : string;
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private constant : Constant,private http: Http) { 
     this.deviceUrl = constant.URL+'deviceMonitor/'
  }
	
	  /**
	   * [getDevices 获取设备列表]
	   * @return {Promise<Device[]>} [设备列表]
	   */
  	getDevices(): Promise<Device[]> {
    	return this.http.get(this.deviceUrl)
             .toPromise()
             .then(response => response.json().data.deviceStatusList as Device[])
             .catch(this.handleError);
  	}
  	private handleError(error: any): Promise<any> {
    	console.error('An error occurred', error); // for demo purposes only
    	return Promise.reject(error.message || error);
  	}

    /**
     * [operateDevice 操作设备状态]
     * @param {[type]} id      [教室设备列表id]
     * @param {[type]} device  [设备类型]
     * @param {[type]} operate [操作类型 open close]
     */
    operateDevice(id,device,operate): void{
      
      let url = this.deviceUrl+id+'?device='+device+'&operation='+operate;
      this.commonOperatGetFunc(url);
    }

    /**
     * [operateCamera 操作摄像机状态]
     * @param {[type]} deviceId [设备id]
     * @param {[type]} cameraId [摄像机id]
     * @param {[type]} operate  [操作类型 open close]
     */
    operateCamera(deviceId,cameraId,code,operate): void{
      //let url = '/ajax_edit_camera_status';
      let url = this.deviceUrl+'camera/'+cameraId+'?code='+code+'&did='+deviceId+'&operation='+operate;
      this.commonOperatGetFunc(url);
    }

    /**
     * [operateAllDevice 一键操作所有设备]
     * @param {[type]} operate [操作类型 open close]
     */
    operateAllDevice(operate): void{
      //let url = '/ajax_edit_all_device_status';
      let url = this.deviceUrl+'all?operation='+operate;
      this.commonOperatGetFunc(url);
    }

    getDeviceInfoById(id): Promise<Device>{
      let url = '/ajax_get_classroom_info';
      let data = {
        'did' : id
      };
      return this.http
          .post(url, JSON.stringify(data), {headers: this.headers})
          .toPromise()
          .then(response => response.json().data.deviceInfo as Device)
          .catch(this.handleError);
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

    /**
     * [commonOperatFunc 公共方法]
     * @param {[type]} url  [访问地址]
     * @param {[type]} data [传输数据]
     */
    commonOperatGetFunc(url): void{
      //console.log(data);
      this.http
        .get(url)
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }
}