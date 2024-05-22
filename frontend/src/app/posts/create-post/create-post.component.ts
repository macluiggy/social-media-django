import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { PostsService } from '../../services/posts/posts.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    TranslateModule,
    CommonModule,
    InputTextareaModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  value = false;
  postForm: FormGroup;
  submitting = false;
  loading = false;

  constructor(private fb: FormBuilder, private postService: PostsService) {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  onSubmit() {
    this.submitting = true;
    if (!this.postForm.valid) {
      return;
    }
    if (this.postForm.valid) {
      this.loading = true;
    }

    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value).subscribe({
        next: (res) => {
          this.submitting = false;
        },
        error: (err) => {
          console.error(err);
          this.submitting = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
