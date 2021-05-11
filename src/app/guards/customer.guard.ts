import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStoraageService:LocalStorageService,){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.companyControl()){
          return true;
      }
      else{
        let userId= this.localStoraageService.get("userId")
        this.router.navigate(["user-information/"+userId])
      this.toastrService.info("Bir Şirket İsmi Eklemelisiniz","BİLGİ PANELİ")
      return false;
      }
   
  }
  
}
