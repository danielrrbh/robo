import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'saquesuplementar'
            },
            {
                path: 'saquesuplementar',
                loadChildren: './../saquesuplementar/saquesuplementar.module#SaqueSuplementarModule'
            },
            {
                path: 'usuarios',
                loadChildren: './../usuarios/usuarios.module#UsuariosModule'
            },
            {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            },
            {
                path: 'grid',
                loadChildren: './grid/grid.module#GridModule'
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'blank-page',
                loadChildren: './blank-page/blank-page.module#BlankPageModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
