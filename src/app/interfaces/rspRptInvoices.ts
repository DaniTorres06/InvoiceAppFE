import { RptInvoices } from "src/app/interfaces/rptInvoices";
import { Response } from "src/app/interfaces/response";

export interface RspRptInvoices {
    lstInvoces: RptInvoices[],
    response: Response

}