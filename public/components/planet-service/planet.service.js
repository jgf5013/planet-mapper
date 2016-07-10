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
var PlanetService = (function () {
    function PlanetService() {
    }
    PlanetService.prototype.getPlanets = function () {
        console.log('you called PlanetService!');
        return [
            { name: 'Luke Skywalker', height: 177, weight: 70 },
            { name: 'Darth Vader', height: 200, weight: 100 },
            { name: 'Han Solo', height: 185, weight: 85 },
        ];
    };
    PlanetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PlanetService);
    return PlanetService;
}());
exports.PlanetService = PlanetService;
//# sourceMappingURL=planet.service.js.map