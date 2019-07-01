import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  getApi(){
    let urlGet = "http://202.65.158.172:9097/department/{loginId}/getdeptsByfloorId/{floorId}";
    urlGet = urlGet.replace('{loginId}','1').replace('{floorId}','5');
    return this.http.get(urlGet);
  }

  postApi(create){
    let urlPost = "http://202.65.158.172:9097/department/{loginid}/create";
    urlPost = urlPost.replace('{loginid}', '1');
    return this.http.post(urlPost, create);
  }

  putApi(edit) {console.log('put');
    let urlEdit = "http://202.65.158.172:9097/department/{loginid}/update";
    urlEdit = urlEdit.replace('{loginid}', '2');
    return this.http.put(urlEdit, edit);
  }

  deleteApi(deptId) {
    let urlDelete = "http://202.65.158.172:9097/department/{loginid}/delete/{deptId}";
    urlDelete = urlDelete.replace('{loginid}','1').replace('{deptId}',deptId);
    return this.http.delete(urlDelete, deptId);
  }

}


// 'http://202.65.158.172:9097/department/{loginid}/delete/?servicename='+servname+'&deptid='+deptId