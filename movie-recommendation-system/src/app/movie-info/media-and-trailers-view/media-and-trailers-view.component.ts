import { Component, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie-management/movie.service';

@Component({
  selector: 'app-media-and-trailers-view',
  templateUrl: './media-and-trailers-view.component.html',
  styleUrls: ['./media-and-trailers-view.component.css']
})

export class MediaAndTrailersViewComponent {

  movieId!: number;
  trailers: string[] = [];
  embedUrls: string[] = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.fetchTrailers();
    });
  }

  fetchTrailers(): void {
    this.isLoading = true;
    this.movieService.getMovieTrailers(this.movieId).subscribe(
      (trailers) => {
        this.trailers = trailers;
        this.embedUrls = this.convertToEmbedUrls(this.trailers);
        this.isLoading = false;
        console.log(this.embedUrls);
      },
      (error) => {
        console.error('Error fetching trailers:', error);
        this.isLoading = false;
      }
    );
  }

  convertToEmbedUrls(trailerUrls: string[]): string[] {
    return trailerUrls.map(url => {
      const videoId = this.extractVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    });
  }

  private extractVideoId(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

}
