import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios.routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MatFormFieldModule, MatSelectModule, MatOptionModule, MatTabsModule,
         MatButtonModule, MatInputModule, MatTableModule, MatIconModule,
         MatRadioModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '../layout/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableUsuariosComponent } from '../tableusuarios/tableusuarios.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [CommonModule,
               UsuariosRoutingModule,
               MatFormFieldModule,
               MatSelectModule,
               MatOptionModule,
               FormsModule,
               ReactiveFormsModule,
               MatTabsModule,
               MatButtonModule,
               MatInputModule,
               MatTableModule,
               MatIconModule,
               FlexLayoutModule,
               MatRadioModule,
               MatSlideToggleModule,
               NgxMaskModule,
             ],
    declarations: [UsuariosComponent, TableUsuariosComponent]
})
export class UsuariosModule {}
