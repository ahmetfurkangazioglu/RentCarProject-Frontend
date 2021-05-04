import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  users:User[]=[];
  email:any;

  constructor(private authService:AuthService,
    private router:Router,
    private localStorage:LocalStorageService,
    private toastrService:ToastrService,
    private userService:UserService,) { }
  loginControl:boolean

  ngOnInit(): void {
    this.tokenControl()
    this.getUserByEmail()
  }
 
  getUserByEmail(){
   this.email= this.localStorage.get("email")
    this.userService.getByEmail(this.email).subscribe(response=>{
      this.users = response.data;
    })
  }


  tokenControl(){
   if(this.authService.isAuthenticated()){
    return this.loginControl=false;
   } else{
     return this.loginControl=true;
   }
  }
 
  clearLocalStorage(){
   this.localStorage.clear();
  }


  
  reload() {

   
      this.localStorage.clear()
      this.toastrService.success('Çıkış yapıldı');
  

    setTimeout(() => {
      this.router
      .navigateByUrl('', {
        skipLocationChange: true,
      })
      .then(() => {      
        this.router.navigate(['/cars']);       
      });

    }, 1000);


    setTimeout(() => {    
        window.location.reload()
    }, 1001);

  
  }


}
