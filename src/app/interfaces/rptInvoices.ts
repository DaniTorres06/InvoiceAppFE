export interface RptInvoices {
    idInvoice : number    
    dateInv : string,
    documentClient : number,
    nameClient : string,
    addressClient : string,
    phoneClient : string,
    descItem : string,
    itemQuantity : number,
    price : number,
    grossValue : number,
    valueDiscount : number,
    ivaAmout : number,
    totalValue : number
    
}