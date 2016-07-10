import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PlanetService } from '../planet-service/planet.service';
import { Planet } from '../interfaces/planet/planet.interface';

/* Note(s):
    - If an import begins with a dot, then it is treated as a relative path from the file that declares the import.
    - If an import begins with an absolute path, then it is assumed to be an external module, so Typescript will walk up the tree looking for a package.json file, then go into the node_modulesfolder, and find a folder with the same name as the import, then looks in the package.json of the module for the main .d.ts or .ts file, and then loads that, or will look for a file that has the same name as the one specified, or an index.d.ts or index.ts file.

 */
@Component({
  selector: 'planet-mapper',
  template: `<div>Hello!</div>`,
  providers: [PlanetService]
})
export class PlanetMapperComponent implements OnInit {
    
    planets: Planet[] = [];
    constructor(private planetService : PlanetService){
        
    }

    ngOnInit() {
        this.getPlanets();
    }

    getPlanets() {
        this.planets = this.planetService.getPlanets();
    }


}