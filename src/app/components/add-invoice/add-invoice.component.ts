import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService} from '../../services/invoice.service'
import { Invoce } from 'src/app/interfaces/invoce';
import { InvoiceBody } from 'src/app/interfaces/invoiceBody';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Response } from 'src/app/interfaces/response'

import { error } from 'console';
import { RspItems } from 'src/app/interfaces/RspItems';
import { Items } from 'src/app/interfaces/Items';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  form: FormGroup;
  fromInvBody: FormGroup;
  formValue: FormGroup;
  vDateNow: Date;
  fechaFormateada: string = '';
  vinvoices: InvoiceBody[] = [];
  vResponse?: Response;
  vRspItem?: Items[];
  //vError!: error;

  vGrossValue:number;
  ValueDiscount :number;
  IvaAmout :number;
  TotalValue :number;


  constructor(
    private fb: FormBuilder,
    private fbBody: FormBuilder,
    private fbValue: FormBuilder,
    private _InvoiceService: InvoiceService,
    private _snackBar: MatSnackBar,
    private vRouter: Router) 

  { 
    this.form = this.fb.group({
      documentClient:[0,Validators.required],
      name:['',Validators.required],
      lastName:['',Validators.required],
      addressClient:['',Validators.required],
      phoneClient:['',Validators.required]
    })

    this.fromInvBody = this.fbBody.group({
      ItemId:[1,Validators.required],
      ItemQuantity:[0,Validators.required],
      Price:[0,Validators.required]      
    })

    this.formValue = this.fbValue.group({
      GrossValue: [46] // Valor inicial del campo de entrada
    });    

    this.vDateNow = new Date();
    this.fechaFormateada = `${this.vDateNow.getFullYear()}-${(this.vDateNow.getMonth() + 1).toString().padStart(2, '0')}-${this.vDateNow.getDate().toString().padStart(2, '0')}`;

    this.vGrossValue = 0;
    this.vGrossValue = this.fromInvBody.value.Price * 1;
    this.ValueDiscount = 0;
    this.IvaAmout = 0 ;
    this.TotalValue = 0;
    
    
  }

  ngOnInit(): void {
    this.LstItems()
    
  }

  invoiceAdd()
  { 

    const invoceBody: InvoiceBody = {
      ItemId: this.fromInvBody.value.ItemId,
      ItemQuantity: this.fromInvBody.value.ItemQuantity,
      Price: this.fromInvBody.value.Price
    }

    const invoce: Invoce = {
      documentClient: this.form.value.documentClient,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      addressClient: this.form.value.addressClient,
      phoneClient: this.form.value.phoneClient,
      invoiceBodys: [invoceBody]
    }

    console.log(invoceBody)   

    this._InvoiceService.addInvoice(invoce).subscribe(data=>{
      
      this.vResponse = data;
      if(this.vResponse.status){
        this._snackBar.open(this.vResponse.message, 'Creado',{
          duration: 4000,
          horizontalPosition: 'right'
        });
      }
      
    },
    error=>{
      
      this.vResponse = error.error;
      console.log(this.vResponse);
      
      
      this._snackBar.open(error.error.message, 'Error',{
        duration: 8000,
        horizontalPosition: 'right'
      });
      
    })
  }

  LstItems(){
    this._InvoiceService.lstItems().subscribe(data=>{      
      this.vRspItem = data.vLstItems;
      //console.log('Prb'+ data);
      console.log(this.vRspItem);
    })
  }

  LstInvoice(){
    this.vRouter.navigate(['/LstInvoiceComponent']);
  }
      
    

  

}
