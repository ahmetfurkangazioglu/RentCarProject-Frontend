import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { UserDetail } from 'src/app/models/userDetail';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  userDetails:UserDetail[]=[];
  userId:number
  userUpdateForm:FormGroup;

  firstName:string
  lastName:string
  email:string
  phoneNumber:string
  companyName:string

  constructor(private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private customerService:CustomerService,
    private formBuilder:FormBuilder,) { }
  

  ngOnInit(): void {
 this.activatedRoute.params.subscribe(params=>{
   if(params["userId"]){
    this.userId=params["userId"];
    this.getUserById(this.userId)
    this.createUserUpdateForm()
   }
 })
  }

 getUserById(userId:number){
 this.userService.getUserByUserId(userId).subscribe(response=>{
   this.userDetails=response.data   
   this.userDetails.forEach(element => {
    this.firstName=element.firstName
    this.lastName=element.lastName
    this.email=element.email
    this.phoneNumber=element.phoneNumber
  }); 
 })
}

  createUserUpdateForm(){
  
  console.log(this.firstName)
    this.userUpdateForm=this.formBuilder.group({
      firstName:[this.firstName,Validators.required],
      lastName:[this.lastName,Validators.required],
      email:[this.email,Validators.required],
      companyName:[this.companyName],
      phoneNumber:[this.phoneNumber,Validators.required]
    })

  
  
}


}
