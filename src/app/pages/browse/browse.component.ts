import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent], // commonModule helps in dependency injection
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
// JSON.parse() convert the json string into json object
/**
 * const jsonString = '{"name": "John", "age": 30}'
 * const parsedObject = JSON.parse(jsonString);
 * console.log(parsedObject.name); // Output: John
 */
export class BrowseComponent implements OnInit{
  auth = inject(AuthService);
  movieService = inject(MovieService);
  userName = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfile = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  userEmail = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  ngOnInit(): void {
    this.movieService.getMovies()
    .subscribe(res => {
      console.log(res)
    });
  }

  signOut() {
    console.warn(sessionStorage.getItem("loggedInUser"));
    sessionStorage.removeItem("loggedInUser");
    // console.warn(sessionStorage.getItem("loggedInUser"));
    this.auth.signOut();
  }
}
