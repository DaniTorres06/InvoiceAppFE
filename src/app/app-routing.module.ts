import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component'
import { LstInvoiceComponent } from './components/lst-invoice/lst-invoice.component';

const routes: Routes = [
  {path: '', redirectTo: 'AddInvoiceComponent', pathMatch: 'full'},
  {path: 'AddInvoiceComponent', component: AddInvoiceComponent},
  {path: 'LstInvoiceComponent', component: LstInvoiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [AddInvoiceComponent, LstInvoiceComponent]