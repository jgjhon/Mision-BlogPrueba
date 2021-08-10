import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../Models/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form!: FormGroup;
  imagePreview!: string;


  //saludo:string = "Hola, esto es una prueba";
  //texto:string = "";
  //content:string[] = [];
  // postExample:Post[] = [{title: "Primer post",summary:"Este es el primer post",content:"este el contenido del post"}];
  // posts:Post[] = [];


  //@Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService, public  route: ActivatedRoute) {
    this.post = {id:"",title:"",summary:"",content:"",author:""};
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators:[Validators.required]}),
      summary: new FormControl(null),
      content: new FormControl(null, {validators:[Validators.required]}),
      image: new FormControl(null, {validators: Validators.required}),
    })
    this.route.paramMap.subscribe((paramMap:ParamMap) =>{
      if (paramMap.has("postId")){
        this.isEditing = true;
        this.postId = paramMap.get("postId")!;
        this.postService.getPost(this.postId).subscribe((postData) =>{
          this.post = {id:postData._id, title:postData.title, summary:postData.summary, content:postData.content, author:postData.author}
        })
      }else{
        this.isEditing = false;
        this.postId = null!;
        // console.log(this.post);
      }
    })
  }

  onSavePost():void{
    if(this.form.invalid){
      return;
    }
    if(this.isEditing){
      this.postService.updatePost(this.form.value,this.postId);
    }else{
      this.postService.addPost(this.form.value);
    }
    this.form.reset();
  }

  onImageSelected(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
