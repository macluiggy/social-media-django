import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-custom-progress-loading',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './custom-progress-loading.component.html',
  styleUrl: './custom-progress-loading.component.scss'
})
export class CustomProgressLoadingComponent {

}
