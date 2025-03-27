import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
 
export class TokenInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //autamaticly call when i call token Interceptor
          // next: HttpHandler >>> the request after we add the token
   const token=   localStorage.getItem("token");
   req=req.clone({
    setHeaders:{
        Autharization:`Bearer ${token}`
    }
    // Interceptor the request , take cope of req ,
    // add the copy to the header with token
   })
   return next.handle(req);
    }
}
 