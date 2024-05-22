import { Component, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NavBarComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  themeSelection: boolean = false;
  currentRoute: string = '';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1];
    });
    translate.setDefaultLang('es');
    // themeService.switchTheme('light');
    themeService.switchTheme('dark');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
}
