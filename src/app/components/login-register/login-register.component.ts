import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  loginForm: FormGroup;
  registerForm: FormGroup;

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.localStorage.set('token', response.data.token);
          this.localStorage.set('email', this.loginForm.value.email);
          this.toastrService.success('Giriş Yapıldı', 'Başarılı');
          this.reload();
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen bütün bilgileri doldurunuz', 'Hata');
    }
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(registerModel);
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.localStorage.set('token', response.data.token);
          this.localStorage.set('email', this.registerForm.value.email);
          this.toastrService.success('Üye Olundu', 'Başarılı');
          this.reload();
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen bütün bilgileri doldurunuz', 'Hata');
    }
  }

  reload() {
    setTimeout(() => {
      this.router
        .navigateByUrl('', {
          skipLocationChange: true,
        })
        .then(() => {
          this.router.navigate(['/home']);
        });
    }, 1000);

    setTimeout(() => {
      window.location.reload();
    }, 1001);
  }
}
