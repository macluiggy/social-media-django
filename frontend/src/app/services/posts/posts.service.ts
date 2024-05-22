import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getRandomPosts({ limit = 10, page = 1 }) {
    return this.http.get(`${this.apiUrl}/posts/random`, {
      params: {
        limit,
        page,
      },
    });
  }

  createPost({ title, content }: { title: string; content: string }) {
    const post = {
      title,
      content,
    };

    return this.http.post(`${this.apiUrl}/posts`, post);
  }

  getUserPosts({
    userId,
    limit = 10,
    page = 1,
  }: {
    userId: number;
    limit?: number;
    page?: number;
  }) {
    return this.http.get(`${this.apiUrl}/posts/user/${userId}`, {
      params: {
        limit,
        page,
      },
    });
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.apiUrl}/posts/${postId}`);
  }
}
