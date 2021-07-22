import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../Models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

//import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  //saludo:string = "Hola, esto es una prueba";
  //texto:string = "";
  //content:string[] = [];
  postExample:Post[] = [{title: "Primer post",summary:"Este es el primer post",content:"este el contenido del post"}];
  posts:Post[] = [];


  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm):void{

    if(form.valid){
      //this.postService.addPost(form.value);
      this.postCreated.emit(form.value);
      form.resetForm();
    }

    //this.postCreated.emit(form.value);
    //this.posts.push(form.value);
    //alert("Agregado");

  }

}
