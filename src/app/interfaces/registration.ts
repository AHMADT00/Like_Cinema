import { SelectedMovie } from './selected-movie';
export interface Registration {
  clientId: string;
  clientUserName: string;
  clientPhoneNumber: string;
  clientCarPlate: string;
  selectedMovies: SelectedMovie[];
}
