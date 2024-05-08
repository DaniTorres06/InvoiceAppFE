import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Invoce } from '../interfaces/invoce'
import { Response } from '../interfaces/response'; 
import { RspRptInvoices } from '../interfaces/rspRptInvoices';
import { RspItems } from '../interfaces/RspItems';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url: string = "https://localhost:7227/InvoiceAddAsync/";
  urlRpt: string = "https://localhost:7227/ReportInvAsync/";
  urlItems: string = "https://localhost:7227/RspItems";

  constructor(private http:HttpClient) { }

  addInvoice(vInvoice:Invoce): Observable<Response>{
    console.log("servi")
    return this.http.post<Response>(this.url,vInvoice)    
  }

  lstInvoice():Observable<RspRptInvoices>{
    return this.http.get<RspRptInvoices>(this.urlRpt);
  }

  lstItems():Observable<RspItems>{
    return this.http.get<RspItems>(this.urlItems);
  }
}
