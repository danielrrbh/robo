import { SaqueSuplementarModule } from './saquesuplementar.module';

describe('SaqueSuplementarModule', () => {
    let saqueSuplementarModule: SaqueSuplementarModule;

    beforeEach(() => {
        saqueSuplementarModule = new SaqueSuplementarModule();
    });

    it('should create an instance', () => {
        expect(saqueSuplementarModule).toBeTruthy();
    });
});
