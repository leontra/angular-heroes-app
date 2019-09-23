// import { TestBed, async } from '@angular/core/testing';
import { Hero } from './hero';

type AssertIsNumber<s> = s extends number ? true : never;
type AssertIsString<S> = S extends string ? true : never;

describe('Hero', () => {

    it('should verify the hero class', () => {
        const hero: Hero = new Hero();
        let heroId: AssertIsNumber<typeof hero.id> = true;
        expect( heroId ).toBeTruthy();

        let heroString: AssertIsString<typeof hero.name> = true;
        expect( heroString ).toBeTruthy();
    });

});
