import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LearningHub';
  name='nedaa alyasein';
  emil='nedaa@mail.com';
  salary=1000;
  handeInputChng(ev:any){
   if(ev.target.value.length>5)
      alert('stop write');
  }
  clearData(){
    this.name="";
    this.emil="";
    this.salary=0;
  }

course:any=[{
  c_id:1,
  c_name:"HTML",
  c_price:50
},

{
  c_id:2,
  c_name:"HTML pro",
  c_price:100
},
{
  c_id:3,
  c_name:"c++",
  c_price:70
}




]


isupdated=true;
changValue(){
  this.isupdated=!this.isupdated;
}

}
