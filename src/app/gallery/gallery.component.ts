import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Image {
  id: number;
  author: string;
  download_url: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'], 
})
export class GalleryComponent implements OnInit {
  images: Image[] = [];
  authors: string[] = [];
  filteredImages: Image[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    this.http.get<Image[]>('https://picsum.photos/v2/list').subscribe(
      (data) => {
        this.images = data; 
        this.filteredImages = data; 
        this.extractAuthors(data); 
      },
      (error) => {
        console.error('Error fetching images:', error); 
      }
    );
  }

  extractAuthors(images: Image[]) {
    const uniqueAuthors = [...new Set(images.map(image => image.author))];
    this.authors = uniqueAuthors;
  }

  onAuthorChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    const selectedAuthor = selectElement.value; 
    this.filteredImages = selectedAuthor
      ? this.images.filter(image => image.author === selectedAuthor)
      : this.images; 
  }
}
