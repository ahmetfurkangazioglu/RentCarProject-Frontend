import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl="https://localhost:44313/api/users/";

  constructor(private htppClient:HttpClient) { }

  getByEmail(email:string):Observable<ListResponseModel<User>>{
   let newPath=this.apiUrl+"email?email="+email
  return this.htppClient.get<ListResponseModel<User>>(newPath); 
 }

}
