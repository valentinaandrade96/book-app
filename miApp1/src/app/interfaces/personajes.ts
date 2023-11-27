export interface Datos {
  count: number;
  next: string;
  previous: string;
  results: Personajes[];
}

export interface Personajes {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Hermaphrodite = "hermaphrodite"
}