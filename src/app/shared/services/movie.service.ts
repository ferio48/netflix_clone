import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  }, 
  headers: {
    accept: 'applcation/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYyODhmYTJiNjFiMGJlODkyMWI3NDFkODU0NDAxNCIsInN1YiI6IjY1YTUyOTNmZDA1YTAzMDBjNGE5Y2Q1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P4-d73IPsTx8sGFblLQsQOHHYUqpfD6CyP7RJwIOxgs'
  }
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  http = inject(HttpClient);

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/changes?page=1', options);
  }
}
