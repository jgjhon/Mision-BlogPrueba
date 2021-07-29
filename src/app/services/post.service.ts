import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {map} from'rxjs/operators';
import { Post } from '../Models/post.model';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "http://localhost:3000/api/posts";

  posts: Post[] = [];
  postUpdated = new Subject<Post[]>();

    constructor(private http:HttpClient) { }

    addPost(post: Post){
      this.http.post<{idPostAdded: string}>(this.url,post).subscribe((response) =>{
        console.log(response);
        post.id = response.idPostAdded;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });
    }

    getPosts(){
      this.http.get<any>(this.url).pipe(map((postData) =>{
        return postData.map((post:{_id:string,title:string,summary:string,content:string})=>{
          return {
            id:post._id,
            title:post.title,
            summary:post.summary,
            content:post.content,
          }
        })
      })).subscribe(
        (dataTransformed) =>{
          this.posts = dataTransformed;
          this.postUpdated.next([...this.posts]);
        }
      );
      //return [...this.posts]; //para retornar una copia
    };

    deletePost(id: string) {
      this.http.delete(this.url+"/"+id).subscribe((result) =>{
        console.log(result);
        const updatedPost =  this.posts.filter(post=> post.id !== id);
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
      })
    }

    getPostsUpdateListener(){
      return this.postUpdated.asObservable();
    }
}
