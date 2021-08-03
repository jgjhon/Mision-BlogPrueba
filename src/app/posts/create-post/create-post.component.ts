import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../Models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

//import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  private isEditing = false;
  private postId!: string;
  post!:Post;


  //saludo:string = "Hola, esto es una prueba";
  //texto:string = "";
  //content:string[] = [];
  // postExample:Post[] = [{title: "Primer post",summary:"Este es el primer post",content:"este el contenido del post"}];
  // posts:Post[] = [];


  //@Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService, public  route: ActivatedRoute) {
    this.post = {id:"",title:"",summary:"",content:""};
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if (paramMap.has("postId")){
        this.isEditing = true;
        this.postId = paramMap.get("postId")!;
        this.postService.getPost(this.postId).subscribe((postData) =>{
          this.post = {id:postData._id, title:postData.title, summary:postData.summary, content:postData.content}
        })
      }else{
        this.isEditing = false;
        this.postId = null!;
        // console.log(this.post);
      }
    })
  }

  onSavePost(form:NgForm):void{
    if(form.invalid){
      return;
    }
    if(this.isEditing){
      this.postService.updatePost(form.value,this.postId);
    }else{
      this.postService.addPost(form.value);
    }
    form.resetForm();
  }
}
