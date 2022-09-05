import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthHelperService } from '../services/auth-helper.service'
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthHelperService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.checkLogin()) {
            //user is there
            let token = this.auth.getToken()
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            })
        }
        console.log(req);

        return next.handle(req)
    }
}