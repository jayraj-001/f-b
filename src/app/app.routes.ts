import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Inventory } from './pages/inventory/inventory';
import { Bill } from './pages/bill/bill';
import { Customer } from './pages/customer/customer';

export const routes: Routes = [
    {
        path:'',
        component:Home
    },
    {
        path:'inventory',
        component:Inventory
    },
    {
        path:'bill',
        component:Bill
    },
    {
        path:'customer',
        component:Customer
    },
    {
        path:'**',
        component:Home
    }
];
