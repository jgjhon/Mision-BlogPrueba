import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../Models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // @Input() posts: Post[] = [];

  posts: Post[] = [];
  postsSub: Subscription;

  constructor(public postService: PostService) {
    this.postsSub = this.postService.getPostsUpdateListener()
    .subscribe((posts:Post[])=>{
      this.posts = posts;
    });
  }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    // this.postsSub = this.postService.getPostsUpdateListener()
    // .subscribe((posts:Post[])=>{
    //   this.posts = posts;
    // });

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }


}
