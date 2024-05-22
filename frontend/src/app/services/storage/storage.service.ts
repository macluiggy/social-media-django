import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { User } from '../../common/types';

const USER_KEY = 'user';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  /**
   * Only save user when user is logged in, if you want to update user data, use updateUser
   * @param user
   */
  public saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(USER_KEY);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      // save user preferred language
      this.savePreferredLanguage(user.preferredLanguage);
    }
  }

  public updateUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const oldUser = localStorage.getItem(USER_KEY);
      if (oldUser) {
        const newUser = { ...JSON.parse(oldUser), ...user };
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      }

      // save user preferred language
      this.savePreferredLanguage(user.preferredLanguage);
    }
  }

  public getUser(): User {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }

    return {} as User;
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(USER_KEY);
      if (user) {
        return true;
      }
    }

    return false;
  }

  public setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  public getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }

    return '';
  }

  public savePreferredLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId) && language) {
      localStorage.setItem('language', language);
    }
  }

  public getPreferredLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('language') || '';
    }

    return '';
  }

  public getTheme(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme') || '';
    }

    return '';
  }

  public setTheme(theme: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }
}
