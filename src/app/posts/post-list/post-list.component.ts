import { Component, OnInit, Input} from '@angular/core';
import { Form } from '@angular/forms';
import { Post } from '../../Models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
