import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabView } from 'primeng/tabview';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  providers: [TabView],
  imports: [TabViewModule, TabMenuModule, ProfileSettingsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
