import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44313/api/customers/";
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath= this.apiUrl+"customerdetail"
   return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }

  customerAdd(customer:Customer):Observable<ResponseModel>{
    let newPath= this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }
 customerUpdate(customer:Customer):Observable<ResponseModel>{
   let newPath=this.apiUrl+"update"
   return this.httpClient.post<ResponseModel>(newPath,customer)
 }
}
