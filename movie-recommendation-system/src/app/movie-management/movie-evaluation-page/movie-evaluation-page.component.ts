import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-evaluation-page',
  templateUrl: './movie-evaluation-page.component.html',
  styleUrls: ['./movie-evaluation-page.component.css']
})
export class MovieEvaluationPageComponent implements OnInit {
  movieTitle: string = '';
  k: number = 10;
  
  datasetStats: any = null;
  loadingStats: boolean = false;
  
  evaluation: any = null;
  loadingEvaluation: boolean = false;
  
  metricsComparison: any = null;
  loadingComparison: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadDatasetStatistics();
  }

  loadDatasetStatistics(): void {
    this.loadingStats = true;
    this.movieService.getDatasetStatistics().subscribe(
      (data) => {
        this.datasetStats = data;
        this.loadingStats = false;
      },
      (error) => {
        console.error('Error loading dataset statistics:', error);
        this.loadingStats = false;
      }
    );
  }

  evaluateMovie(): void {
    if (!this.movieTitle.trim()) return;
    
    this.loadingEvaluation = true;
    this.movieService.evaluateRecommendations(this.movieTitle, this.k).subscribe(
      (data) => {
        this.evaluation = data;
        this.loadingEvaluation = false;
      },
      (error) => {
        console.error('Error evaluating movie:', error);
        this.loadingEvaluation = false;
      }
    );
  }

  compareMetrics(): void {
    if (!this.movieTitle.trim()) return;
    
    this.loadingComparison = true;
    this.movieService.compareMetrics(this.movieTitle, this.k).subscribe(
      (data) => {
        this.metricsComparison = data;
        this.loadingComparison = false;
      },
      (error) => {
        console.error('Error comparing metrics:', error);
        this.loadingComparison = false;
      }
    );
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
