import { Attraction } from "./attraction";

export interface Trip {
    id: number;
    place: string;
    tripDate: Date;
    tripFinishDate: Date;
    attractions: Attraction[];
  }
