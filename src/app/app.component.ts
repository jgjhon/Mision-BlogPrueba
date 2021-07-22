import { Component } from '@angular/core';
import { Post } from './Models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts:Post[] = [];
  title = 'Mision-Blog';

  onPostAdded(post: Post){
    this.storedPosts.push(post);
    //this.posts.push(form.value);
  }
}
