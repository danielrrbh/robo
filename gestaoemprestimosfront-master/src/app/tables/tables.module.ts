import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule, MatSortModule, MatIconModule, MatCardModule,
         MatFormFieldModule, MatInputModule } from '@angular/material';
import { TablesRoutingModule } from './tables-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatSortModule,
        MatInputModule,
        MatIconModule,
        MatCardModule
    ],
    declarations: [ ]
})
export class TablesModule {}
