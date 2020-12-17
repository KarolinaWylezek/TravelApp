import { Place } from "./place";
import { Event } from "./event"

export interface City {
  id: number;
  name: string;
  country: string;
  continent: string;
  description: string;
  places: Place[];
  events: Event[];
}



