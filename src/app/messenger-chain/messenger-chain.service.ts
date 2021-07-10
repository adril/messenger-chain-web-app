import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Message } from "./entity/message";
import * as elliptic from "elliptic";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Block } from "./entity/block";
const EC = elliptic.ec;
const ec = new EC("secp256k1");

@Injectable({
  providedIn: "root",
})
export class MessengerChainService {
  messengerChainUrl = `${environment.apiUrl}/messenger-chain`;
  // INFO: private key is retreived from localStorage then env
  privateKey = localStorage.getItem("privateKey") ?? environment.privateKey;
  myKey = ec.keyFromPrivate(this.privateKey);
  myWalletAddress = this.myKey.getPublic("hex");

  constructor(private http: HttpClient) {
    // this.generateKeys();
  }

  updatePrivateKey(privateKey: string): boolean {
    this.myKey = ec.keyFromPrivate(privateKey);
    this.myWalletAddress = this.myKey.getPublic("hex");
    // INFO: set privateKey into local storage
    localStorage.setItem("privateKey", privateKey);
    return true;
  }

  sendMessage(message: Message): Observable<Message> {
    message.signMessage(this.myKey);
    console.log(`message.isValid: ${message.isValid()}`);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http
      .post<Message>(
        `${this.messengerChainUrl}/message-signed`,
        message,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  loadBlocks(): Observable<Block[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http
      .get<Block[]>(`${this.messengerChainUrl}/list`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  minePendingMessages(): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http
      .post<void>(
        `${this.messengerChainUrl}/mine-pending-messages`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  generateKeys(): any {
    console.log("generate keys");
    // Generate a new key pair and convert them to hex-strings
    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");

    // Print the keys to the console
    console.log();
    console.log(
      "Your public key (also your wallet address, freely shareable)\n",
      publicKey
    );

    console.log();
    console.log(
      "Your private key (keep this secret! To sign messages)\n",
      privateKey
    );
    return { publicKey, privateKey };
  }

  // INFO: helper

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
}
