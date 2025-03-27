import { Component } from '@angular/core';
import { GalleryService } from '../Services/gallery.service';
 
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
 images: any = [{}];  
   
  constructor(public galleryService: GalleryService) {}
  
 
 
  ngOnInit(): void {
    this.galleryService.getAllImages();
  }
}