import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  



  @Input()PostObj:any
  @Output() opneProfile=new EventEmitter();


  showProfile(){
        this.opneProfile.emit();
      }
    
}
