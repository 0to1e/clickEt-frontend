export interface Movie {
    _id: string;
    name: string;
    posterURL: {
      sm: string;
      lg: string;
    };
    status: string;
    trailerURL: string;
  }
  
  export interface MovieSectionProps {
    variant: "showing" | "upcoming";
  }