import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SaqueSuplementarComponent } from './saquesuplementar.component';

describe('SaqueSuplementarComponent', () => {
    let component: SaqueSuplementarComponent;
    let fixture: ComponentFixture<SaqueSuplementarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SaqueSuplementarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SaqueSuplementarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
