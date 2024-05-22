import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';

function passwordMatchValidator(
  formGroup: AbstractControl
): { [key: string]: boolean } | null {
  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    FileUploadModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('profileImage') profileImage: any;

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, Validators.required),
        username: new FormControl(null, Validators.required),
        profileImage: new FormControl(null, Validators.required),
      },
      { validators: passwordMatchValidator }
    );
  }

  onSubmit() {
    const formData = new FormData();
      const updateUserData = this.registerForm.value;

      for (const key in updateUserData) {
        if (updateUserData.hasOwnProperty(key) && key !== 'profileImage') {
          formData.append(key, updateUserData[key]);
        }
      }

      if (this.registerForm.get('profileImage')?.value) {
        formData.append(
          'profileImage',
          this.registerForm.get('profileImage')?.value
        );
      }

      this.authService.signUp(formData).subscribe({
        next: (res: any) => {
          this.authService.updateLoggedInUser(res.data);
          this.profileImage.clear();
        },
      });
  }

  onSelect(event: any) {
    for (const file of event.files) {
      this.registerForm.patchValue({
        profileImage: file,
      });
      this.registerForm.get('profileImage')?.updateValueAndValidity();
    }
  }
}
