
import { Planet } from './Planet.interface';
import confirmedExoplanets from './confirmed-exoplanets.json';
// import customExoplanets from './custom-exoplanets.json';

export async function http<T>(
    request: RequestInfo
  ): Promise<any> {
    const body = await confirmedExoplanets;
    return body;
  }

export function getPublicationDateRange(planets: Planet[]): Date[]  {
    const minDate = new Date(Math.min.apply(Math, planets
        .map((p: Planet) => {
            return typeof p.pl_publ_date !== 'undefined' && p.pl_publ_date ? new Date(p.pl_publ_date).getTime() : new Date().getTime();
        })
    ));
    return [minDate, new Date()];
}

export function getDistinctPublicationDate(planets: Planet[]): string[] {
  let pubDates = new Set<string>();
  planets.forEach((p: Planet) => {
    if(p.pl_publ_date) {
      pubDates.add(p.pl_publ_date);
    }
  });
  const sortedSet = Array.from(pubDates).sort();
  return sortedSet;
}

export async function fetchPlanets(): Promise<Planet[]> {
    const planets: Planet[] = await http<Planet[]>('./confirmed-exoplanets.json');

    return planets;
}