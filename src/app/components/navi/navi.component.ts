import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService) { }
  loginControl:boolean

  ngOnInit(): void {
    this.tokenControl()
  }

  tokenControl(){
   if(this.authService.isAuthenticated()){
    return this.loginControl=false;
   } else{
     return this.loginControl=true;
   }
  }
 
}
