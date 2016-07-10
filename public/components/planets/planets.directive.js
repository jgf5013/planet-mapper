"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var planet_service_1 = require('../planet-service/planet.service');
var PlanetMapperComponent = (function () {
    function PlanetMapperComponent(planetService) {
        this.planetService = planetService;
        this.planets = [];
    }
    PlanetMapperComponent.prototype.ngOnInit = function () {
        this.getPlanets();
    };
    PlanetMapperComponent.prototype.getPlanets = function () {
        this.planets = this.planetService.getPlanets();
    };
    PlanetMapperComponent = __decorate([
        core_1.Component({
            selector: 'planet-mapper',
            template: "<div>Hello!</div>",
            providers: [planet_service_1.PlanetService]
        }), 
        __metadata('design:paramtypes', [planet_service_1.PlanetService])
    ], PlanetMapperComponent);
    return PlanetMapperComponent;
}());
exports.PlanetMapperComponent = PlanetMapperComponent;
//# sourceMappingURL=planets.directive.js.map