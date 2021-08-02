import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler,
         HTTP_INTERCEPTORS, HttpResponse,
         HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { FieldMessage } from '../models/fieldmessage';
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from 'src/app/dialog-overview/dialog-overview.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService, public dialog: MatDialog) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
           .pipe(
               catchError((error: any) => {
                   let errorObj = error;
                   if (errorObj.error) {
                       errorObj = errorObj.error;
                   }
                   if (!errorObj.status) {
                       errorObj = JSON.parse(errorObj);
                   }

                   console.log('Erro detectado pelo interceptor: ');
                   console.log(errorObj);

                   switch (errorObj.status) {
                        case 400:
                            this.handle400(errorObj);
                        break;
                        case 401:
                           this.handle401(errorObj);
                       break;
                       case 403:
                          this.handle403();
                        break;
                        case 422:
                          this.handle422(errorObj);
                        break;

                        default:
                          this.handleErrorDefault(errorObj);
                        break;
                   }

                    return Observable.throw(errorObj);
                })
           );
    }

    async handle400(errorObj) {
        let texto = '';
        errorObj.errors.forEach(el => {
            texto += el.defaultMessage + ' <br /> ';
        });
        this.dialog.open(DialogOverviewComponent, {
            width: '350px',
            data: {
                   titulo: errorObj.status + 'Dados Inválidos',
                   texto: texto
                  }
        });
    }

    handle403() {
        this.storage.setLocalStorage(null);
    }

    async handle401(errorObj) {
        this.dialog.open(DialogOverviewComponent, {
            width: '350px',
            data: {
                   titulo: errorObj.status + ' - ' + errorObj.error,
                   texto: errorObj.message
                  }
        });
    }

    async handle422(errorObj) {
        this.dialog.open(DialogOverviewComponent, {
            width: '300px',
            data: {
                   titulo: '422' + errorObj.status,
                   texto: errorObj.error
                  }
        });
    }

    async handleErrorDefault(errorObj) {
        this.dialog.open(DialogOverviewComponent, {
            width: '300px',
            data: {
                   titulo: errorObj.status + ' - ' + errorObj.error,
                   texto: errorObj.defaultMessage
                  }
        });
    }

    private listErrors(messages: FieldMessage[]): string {
        let s = '';
        for (let i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';

        }
        return s;
    }
}
