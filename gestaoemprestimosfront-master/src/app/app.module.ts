import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule,
         MatToolbarModule, MatTabsModule, MatFormFieldModule, MatDialogModule,
         MatSortModule, MatCardModule, MatGridListModule,
         MatSelectModule, MatOptionModule, MatRadioModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from 'src/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SaqueSuplementarService } from 'src/services/saquesuplementar.service';
import { StorageService } from 'src/services/storage.service';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { UsuariosService } from 'src/services/usuarios.service';
import { HttpErrorInterceptor } from 'src/interceptors/error.interceptor';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
    declarations: [AppComponent, DialogOverviewComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSortModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatSlideToggleModule,
        NgxMaskModule.forRoot(options),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [AuthService,
                SaqueSuplementarService,
                UsuariosService,
                StorageService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpErrorInterceptor,
                    multi: true
                },
                DatePipe
            ],
    bootstrap: [AppComponent, DialogOverviewComponent]
})
export class AppModule {}
