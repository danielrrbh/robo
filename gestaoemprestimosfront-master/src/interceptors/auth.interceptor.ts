import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler,
    HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const localUser = this.storage.getLocalStorage();
       const N = API_CONFIG.baseUrl.length;
       const apiBaseRequest = request.url.substr(0, N) === API_CONFIG.baseUrl;
       request.headers.set('Content-Type', 'application/json');
       if (localUser && apiBaseRequest) {
           const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)});
           return next.handle(authReq);
       } else {
            return next.handle(request);
       }
    }
}
