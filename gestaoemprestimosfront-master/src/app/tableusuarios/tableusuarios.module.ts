import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule, MatSortModule, MatIconModule, MatCardModule,
         MatGridListModule, MatTabsModule, MatButtonModule, MatSelectModule,
         MatOptionModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { UsuariosRoutingModule } from '../usuarios/usuarios.routing.module';
import { StatModule } from '../shared/modules/stat/stat.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        UsuariosRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatSortModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: []
})
export class TableUsuariosModule {}
