import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { DataService } from '../data/data.service';
import { NetworkServiceService } from 'network-service';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private onlineStatus: boolean = true;
  constructor(private toastService:ToastService,private dataService:DataService,private network:NetworkServiceService){
    this.network.isOnline$.subscribe((status)=>{
      this.onlineStatus=status
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.onlineStatus) {
      return this.handleOfflineError();
    }
    let config = this.dataService.getConfig()
    const token = config.accessToken;
    let authReq = this.addAuthHeader(req, token);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private addAuthHeader(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (!token) {
      return req;
    }
     if (req.url.includes('storage.googleapis.com')) {
      return req.clone({
        setHeaders:{
          "Access-Control-Allow-Origin": "*"
        }
      })
    }
      else {
          return req.clone({
            setHeaders: {
            'Authorization': `Bearer ${token}`,
            'x-auth-token': token,
            'x-authenticated-user-token': token,
            'Content-Type': 'application/json',
            'x-app-ver':'' }
          }
        );
      }
  }

    private handleError=(error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'Unknown error!';
    this.toastService.showToast(error.error.message,"danger")
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        window.location.href = '/'
      }
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(error.error));
  }

  private handleOfflineError(): Observable<never> {
    this.toastService.showToast("OFFLINE_MSG",'danger')
    return throwError(() => ({
      status: 0,
      error:{message: 'You are offline'},
    }));
  }

}