import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,
         MatTabsModule, MatFormFieldModule, MatInputModule,
         MatRadioModule, MatSortModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { StatModule } from '../shared/modules/stat/stat.module';
import { SaqueSuplementarRoutingModule } from './saquesuplementar-routing.module';
import { SaqueSuplementarComponent } from './saquesuplementar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '../layout/forms/forms.module';
import { TablesComponent } from '../tables/tables.component';

@NgModule({
    imports: [
        CommonModule,
        SaqueSuplementarRoutingModule,
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
        MatRadioModule,
        MatOptionModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [SaqueSuplementarComponent, TablesComponent]
})
export class SaqueSuplementarModule {}
