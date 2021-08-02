import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableUsuariosComponent } from './tableusuarios.component';

const routes: Routes = [
    {
        path: '',
        component: TableUsuariosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TableUsuariosRoutingModule {}
