import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { User } from '../../common/types';
// import for <p-inputText
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent {
  @ViewChild('profileImage') profileImage: any;
  userId: number = 0;

  profileForm: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      id: new FormControl(null),
      username: new FormControl(null),
      // profile picture is a file
      profileImage: new FormControl(null, {}),
    });

    this.authService.getLoggedInUser().subscribe({
      next: (res: any) => {
        const user: User = res.data;

        this.userId = user.id;

        this.profileForm.patchValue(user);
      },
    });
  }

  onSubmit() {
    const formData = new FormData();
    const updateUserData = this.profileForm.value;

    // Append all properties of updateUserData except the file to formData
    for (const key in updateUserData) {
      if (updateUserData.hasOwnProperty(key) && key !== 'profileImage') {
        formData.append(key, updateUserData[key]);
      }
    }

    // Append the file separately
    if (this.profileForm.get('profileImage')?.value) {
      formData.append(
        'profileImage',
        this.profileForm.get('profileImage')?.value
      );
    }

    this.userService.updateUserData(formData, this.userId).subscribe({
      next: (res: any) => {
        this.authService.updateLoggedInUser(res.data);
        this.profileImage.clear();
      },
    });
  }

  onSelect(event: any) {
    for (const file of event.files) {
      this.profileForm.patchValue({
        profileImage: file,
      });
      this.profileForm.get('profileImage')?.updateValueAndValidity();
    }
  }
}
