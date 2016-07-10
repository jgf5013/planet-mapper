import { Component } from '@angular/core';
import { Planet } from '../interfaces/planet/planet.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class PlanetService {
  
//   constructor(http:Http) {
//     console.log('PlanetService created.', http);
//     this.people = http.get('api/people.json')
//       .map(response => response.json());
//   }
  getPlanets() : Planet[] {
    console.log('you called PlanetService!');
    return [
      {name: 'Luke Skywalker', height: 177, weight: 70},
      {name: 'Darth Vader', height: 200, weight: 100},
      {name: 'Han Solo', height: 185, weight: 85},
    ];
  }

}