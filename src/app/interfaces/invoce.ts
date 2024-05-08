import { InvoiceBody } from "./invoiceBody";

export interface Invoce {
    //dateInv: Date,
    documentClient : number,
    name: string,
    lastName: string,
    addressClient: string,
    phoneClient: string,
    invoiceBodys: InvoiceBody[] ;
}
