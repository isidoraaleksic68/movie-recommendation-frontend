export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Keyword {
    id: number;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    name: string;
  }
  
  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
  }
  
  export interface Movie {
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    keywords: Keyword[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string; // Use Date type if you want to handle it as a Date object
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    vote_average: number;
    vote_count: number;
    poster_path?: string; // Add this for image URL
  }
  