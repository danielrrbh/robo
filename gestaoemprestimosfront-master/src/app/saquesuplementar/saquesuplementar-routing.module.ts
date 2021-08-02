import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaqueSuplementarComponent } from './saquesuplementar.component';

const routes: Routes = [
    {
        path: '',
        component: SaqueSuplementarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaqueSuplementarRoutingModule {}
