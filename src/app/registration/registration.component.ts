import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  regestrationForm: FormGroup;
  registrationError: string | null = null;

  constructor(private userService: UserService,     private formBuilder: FormBuilder,) {
  
    this.regestrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get email() {
    return this.regestrationForm.get('email');
  }

  get name() {
    return this.regestrationForm.get('name');
  }

  get password() {
    return this.regestrationForm.get('password');
  }

  register() {
    if (this.regestrationForm.invalid) {
      return;
    }

    const { email, name, password } = this.regestrationForm.value;
    this.userService.register(email, name, password).subscribe(
      () => {
        this.registrationError = null;
        // Handle successful registration, e.g., redirect to the login page
      },
      (error) => {
        this.registrationError = error.error.message;
      }
    );
  }
}
