
import { Planet } from './Planet.interface';
import { of, Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';

import confirmedExoplanets from './confirmed-exoplanets.json';
// import { Observable } from 'redux';

export async function http<T>(
    request: RequestInfo
  ): Promise<any> {
    const response = await fetch(request, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      });
    // const body = await response.json();
    const body = await confirmedExoplanets;
    return body;
  }

export function getPublicationDateRange (planets: Planet[]): Date[]  {
    // const minDate = new Date(Math.min.apply(Math, planets.map((p) => new Date(p.mpl_publ_date).getTime())));
    // return [minDate, new Date()];
    return [new Date('1990-01'), new Date()];
}

export async function fetchPlanets(): Promise<Planet[]> {
    const planets: Planet[] = await http<Planet[]>('./confirmed-exoplanets.json');
    console.log('planet: ', planets[0]);
    return planets;
}