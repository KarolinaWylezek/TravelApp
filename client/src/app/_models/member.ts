import { UserTrip } from "./trip";

export interface Member {
    id: number;
    username: string;
    email: string;
    userType: string;
    userTrips: UserTrip[];
  }
  

