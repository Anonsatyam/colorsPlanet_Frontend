import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared-services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  userLogedIn: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
        this.isLoggedIn()
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      this.userLogedIn = true;
      this.sharedService.checkLoginOrNot(true);
    }
  }
}
