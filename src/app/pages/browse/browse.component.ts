import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent], // commonModule helps in dependency injection
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
  bannerDetails = new Observable<any>();
  bannerVideo = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  // down is array of observables, i can subscribe to it using a fork join
  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    console.warn(this.movieService.getMovies());
    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
        this.bannerDetails = this.movieService.getBannerDetail(movies.results[0].id);
        this.bannerVideo = this.movieService.getBannerVideo(movies.results[0].id);
        // create a property to store all the above information
        return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated};
      })
    ).subscribe((res: any) => {
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.ratedMovies = res.ratedMovies.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
    })
  }

  signOut() {
    console.warn(sessionStorage.getItem("loggedInUser"));
    sessionStorage.removeItem("loggedInUser");
    // console.warn(sessionStorage.getItem("loggedInUser"));
    this.auth.signOut();
  }
}
