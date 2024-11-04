import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GalleryComponent } from './gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, GalleryComponent],
  template: `<h1>{{ title }}</h1><app-gallery></app-gallery>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Photo Gallery';
}
