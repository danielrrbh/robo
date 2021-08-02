import { TableUsuariosModule } from './tableusuarios.module';

describe('TableUsuariosModule', () => {
    let tableUsuariosModule: TableUsuariosModule;

    beforeEach(() => {
        tableUsuariosModule = new TableUsuariosModule();
    });

    it('should create an instance', () => {
        expect(tableUsuariosModule).toBeTruthy();
    });
});
