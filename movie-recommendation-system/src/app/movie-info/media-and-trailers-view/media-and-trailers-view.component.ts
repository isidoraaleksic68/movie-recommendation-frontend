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

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.fetchTrailers();
    });
  }

  fetchTrailers(): void {
    this.movieService.getMovieTrailers(this.movieId).subscribe(
      (trailers) => {
        this.trailers = trailers;
        this.embedUrls = this.convertToEmbedUrls(this.trailers);
        console.log(this.embedUrls); // Check the converted URLs
      },
      (error) => {
        console.error('Error fetching trailers:', error);
      }
    );
  }

  convertToEmbedUrls(trailerUrls: string[]): string[] {
    // Convert each URL to the embed format
    return trailerUrls.map(url => {
      const videoId = this.extractVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    });
  }

  private extractVideoId(url: string): string {
    // Regular expression to extract the video ID from the URL
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

}
