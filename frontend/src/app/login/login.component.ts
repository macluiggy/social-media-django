import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    password: '',
  };
  user: any;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.user = this.storageService.getUser();
  }

  login() {
    const { email, password } = this.form;

    this.authService.signIn({ email, password }).subscribe({
      next: (response: any) => {
        const data = response.data;
        this.user = data.user;

        this.isLoggedIn = true;
        this.isLoginFailed = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
