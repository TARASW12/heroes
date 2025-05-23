export interface Powerstats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface Biography {
  'full-name': string;
  'alter-egos': string;
  aliases: string[];
  'place-of-birth': string;
  'first-appearance': string;
  publisher: string;
  alignment: string;
}

export interface Appearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  'eye-color': string;
  'hair-color': string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Connections {
  'group-affiliation': string;
  relatives: string;
}

export interface Superhero {
  id: string;
  name: string;
  powerstats: Powerstats;
  biography: Biography;
  appearance: {
    gender: string | null;
    race: string | null;
    height: string[] | null;
    weight: string[] | null;
    'eye-color': string | null;
    'hair-color': string | null;
  };
  work: Work;
  connections: Connections;
  image: {
    url: string | null;
  };
  response?: string;
  error?: string;
}

export interface SuperheroResponse {
  response: string;
  'results-for'?: string;
  results?: Superhero[];
  error?: string;
}
