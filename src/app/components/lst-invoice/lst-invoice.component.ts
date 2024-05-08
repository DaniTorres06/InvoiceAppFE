import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { InvoiceService} from '../../services/invoice.service'
import { RptInvoices } from 'src/app/interfaces/rptInvoices';
import { Response } from 'src/app/interfaces/response';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lst-invoice',
  templateUrl: './lst-invoice.component.html',
  styleUrls: ['./lst-invoice.component.css'],  
  })

export class LstInvoiceComponent implements OnInit, AfterViewInit {

  vInvoices: RptInvoices[] = [];
  vObjResponse: Response;
  displayedColumns: string[] = ['dateInv', 'documentClient', 'nameClient','addressClient','phoneClient','descItem','itemQuantity','price','grossValue','ivaAmout','totalValue'];
  dataSource = new MatTableDataSource<RptInvoices>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _InvoiceService: InvoiceService,
    private vRouter: Router){
    this.vObjResponse = {message:"",code:0, status:false};    
   }  

  ngOnInit(): void {
    this.lstInvoices()
  }
  
  lstInvoices(){
    this._InvoiceService.lstInvoice().subscribe(data=>{
      this.vInvoices = data.lstInvoces;
      this.vObjResponse = data.response;
      this.dataSource.data = data.lstInvoces;
      })
  }

  AddInvoice(){
    this.vRouter.navigate(['/AddInvoiceComponent']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}

