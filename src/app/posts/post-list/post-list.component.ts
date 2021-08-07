import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from '../../Models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  isAuth = false;
  userId! : string;
  private authListenerSub!: Subscription;

  posts: Post[] = [];
  postsSub: Subscription;

  constructor(public postService: PostService, public authService: AuthService) {
    this.postsSub = this.postService.getPostsUpdateListener()
    .subscribe((posts:Post[])=>{
      this.posts = posts;
    });
  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService.getPostsUpdateListener()
    .subscribe((posts:Post[])=>{
      this.posts = posts;
    });
    this.isAuth = this.authService.getIsAuthenticated();

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isAuth = isAuthenticated;
      this.userId = this.authService.getUserId();
    });

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  onDelete(id:string):void{
    this.postService.deletePost(id);
  }

}
