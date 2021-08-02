import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableUsuariosComponent } from './tableusuarios.component';

describe('TablesComponent', () => {
    let component: TableUsuariosComponent;
    let fixture: ComponentFixture<TableUsuariosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableUsuariosComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableUsuariosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
