import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  constructor(public post:PostService,private router:Router){}

  ngOnInit(): void {
    this.post.gitAllpost();



  }
  goToProfile(){
        this.router.navigate(['profile'])
        }
}
