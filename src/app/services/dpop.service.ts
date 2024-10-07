import { Injectable } from '@angular/core';
import { exportJWK, generateKeyPair, KeyLike, SignJWT } from 'jose';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DPoPService {
  private privateKey!: KeyLike;
  private publicKey: any | null = null;

  constructor() {
    this.generateKeyPair();
  }

  async generateKeyPair() {
    const { publicKey, privateKey } = await generateKeyPair('ES256');
    this.privateKey = privateKey;
    this.publicKey = await exportJWK(publicKey);
  }

  getPublicKey() {
    return this.publicKey;
  }

  createDPoPProof(method: string, url: string): Observable<string> {
    // Wait until the key is generated
    if (!this.publicKey) {
      return of('Private key not generated yet').pipe(
        switchMap(() => {
          throw new Error('Private key not generated yet');
        })
      );
    }

    return from(this.createDPoPProofAsync(method, url)).pipe(
      catchError((err) => {
        console.error('Error creating DPoP proof', err);
        throw err;
      })
    );
  }

  private async createDPoPProofAsync(
    method: string,
    url: string
  ): Promise<string> {
    const jwt = await new SignJWT({
      htm: method,
      htu: url,
      jti: crypto.randomUUID(),
    })
      .setProtectedHeader({ alg: 'ES256', typ: 'dpop+jwt' })
      .setIssuedAt()
      .sign(this.privateKey);

    return jwt;
  }
}
