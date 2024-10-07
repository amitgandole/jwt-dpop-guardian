import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DPoPService } from './dpop.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private dpopService: DPoPService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Clone the request to add the Authorization header if the token exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Create DPoP proof for the request
    const url = request.url;
    const method = request.method;

    const publicKey = this.dpopService.getPublicKey();

    return this.dpopService.createDPoPProof(method, url).pipe(
      switchMap((dpopProof) => {
        const publicKey = this.dpopService.getPublicKey(); // Get the public key from DPoP service

        // Clone the request to add the Authorization and DPoP headers
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            DPoP: dpopProof,
            'x-public-key': JSON.stringify(publicKey),
          },
        });

        // Pass the cloned request instead of the original one to the next handler
        return next.handle(clonedRequest);
      })
    );
  }
}
