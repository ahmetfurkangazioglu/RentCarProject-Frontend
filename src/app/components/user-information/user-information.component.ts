import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { UserDetail } from 'src/app/models/userDetail';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  userDetails:UserDetail[];
  userId:number
  userUpdateForm:FormGroup;

  firstName:string
  lastName:string
  email:string
  phoneNumber:string
  companyName:string

  constructor(private activatedRoute:ActivatedRoute,
    private userService:UserService,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService:LocalStorageService) { }
  

  ngOnInit(): void {
    this.createUserUpdateForm()
 this.activatedRoute.params.subscribe(params=>{
   if(params["userId"]){
    this.userId=params["userId"];
    this.getUserById(params["userId"])
   

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
      this.companyName=element.companyName
      this.phoneNumber=element.phoneNumber
      
    });
   
   this.createUserUpdateForm()
 })
 
}

  createUserUpdateForm(){
  
  
    this.userUpdateForm=this.formBuilder.group({
      firstName:[this.firstName,Validators.required],
      lastName:[this.lastName,Validators.required],
      email:[this.email,Validators.required],
      companyName:[this.companyName],
      phoneNumber:[this.phoneNumber,Validators.required]
    }) 
}

userUpdate(){
  if(this.userUpdateForm.valid){
    console.log(this.userId)
    let userUpdateModel= Object.assign({id: +this.userId},this.userUpdateForm.value)
    console.log(this.userUpdateForm)
    this.userService.userUpdate(userUpdateModel).subscribe(response=>{
     
      let email = this.userUpdateForm.value.email
      this.localStorageService.delete("email")
      this.localStorageService.set("email",email)
      this.toastrService.success("Bilgiler güncellendi","Başarılı")
      setTimeout(() => {
        window.location.reload()
      }, 550);
      
    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")        
        }
      } 
    })
  }
  else{
    this.toastrService.warning("Formunuz eksik","Hata")
  }
}

}
