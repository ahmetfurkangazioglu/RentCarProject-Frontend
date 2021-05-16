import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingelResponseModel } from '../models/singelResponseModel';
import { User } from '../models/user';
import { UserDetail } from '../models/userDetail';
import { UserOperationClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl="https://localhost:44313/api/users/";

  constructor(private httpClient:HttpClient) { }

  getByEmail(email:string):Observable<ListResponseModel<User>>{
   let newPath=this.apiUrl+"email?email="+email
  return this.httpClient.get<ListResponseModel<User>>(newPath); 
 }

 getByUserId(userId:number):Observable<ListResponseModel<User>>{
  let newPath=this.apiUrl+"email?email="+userId
 return this.httpClient.get<ListResponseModel<User>>(newPath); 
}

getUserByUserId(userId:number):Observable<ListResponseModel<UserDetail>>{
  let newPath= this.apiUrl+"userdetailuserId?userId="+userId
  return this.httpClient.get<ListResponseModel<UserDetail>>(newPath)
}
 userUpdate(user:UserDetail):Observable<ResponseModel>{
  let newPath=this.apiUrl+"update"
  return this.httpClient.post<ResponseModel>(newPath,user)
 }
 getClaim(user:User):Observable<ListResponseModel<UserOperationClaim>>{
   let newPath= this.apiUrl+"claim?user="+user
   return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath)
 }
}
