import { Client } from './../app/interfaces/client';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HomeComponent } from 'src/app/component/home/home.component';
import { RegistrationComponent } from 'src/app/component/registration/registration.component';
import { EditclientComponent } from 'src/app/component/editclient/editclient.component';
import { EditmoviesComponent } from 'src/app/component/editmovies/editmovies.component';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBgPKVnzb3h6aPtT_IOQmLlaEA8RPfwqEo',
    authDomain: 'like-cinema-2f29e.firebaseapp.com',
    projectId: 'like-cinema-2f29e',
    storageBucket: 'like-cinema-2f29e.appspot.com',
    messagingSenderId: '992323830136',
    appId: '1:992323830136:web:d892d1d70a660d14acc88d',
  },
  routers: [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'admin/editMovies', component: EditmoviesComponent },
    { path: 'admin/likeClients', component: EditclientComponent },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
