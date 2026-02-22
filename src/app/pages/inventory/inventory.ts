import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})

export class Inventory implements OnInit {

  private apiUrl = "https://localhost:7082/api/Inventory";
  httpClient = inject(HttpClient);
  inventoryDto: any[] = [];

  inventoryData = {
    productId: 0,
    productName: "",
    stockAvailable: 0,
    reorderStock: 0
  }


  ngOnInit(): void {
    this.inventoryDetails();
  }

  inventoryDetails() {
    let apiUrl = "https://localhost:7082/api/Inventory"
    this.httpClient.get<any[]>(apiUrl).subscribe({
    next: (data) => {
      this.inventoryDto = data;
    },
    error: (err) => {
      console.error("Error loading inventory:", err);
    }
  });
  }

  onSubmit(): void {
    let apiUrl = "https://localhost:7082/api/Inventory"
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    this.httpClient.post(apiUrl, this.inventoryData, httpOptions).subscribe(
      {
        next: v => console.log(v),
        error: e => console.log(e),
        complete: () => {
          alert('Form submitted' + JSON.stringify(this.inventoryData));
          this.inventoryDetails();
        }
      })
    // alert('Form submitted' + JSON.stringify(this.inventoryData))
  }

  // loadData() {
  //   let apiUrl = "https://localhost:7082/api/Inventory"

  //   this.httpClient.get(apiUrl).subscribe(data => {
  //     this.inventoryDto = data;
  //   });
  // }

  // onDelete(productId:number){
  //   const isDelete = confirm("Do you want to delete");
  //   if(isDelete){
  //     let apiUrl = `https://localhost:7082/api/Inventory/${productId}`
  //     this.httpClient.delete(apiUrl).subscribe({
  //     next: () => {
  //       // Remove item from UI instantly
  //       this.inventoryDto = this.inventoryDto.filter(
  //         item => item.productId !== productId
  //       );
  //     },
  //     error: (err) => {
  //       console.error("Delete failed:", err);
  //     }
  //   });
  //   }
  // }


onDelete(productId: number) {

  const isDelete = confirm("Do you want to delete?");
  if (!isDelete) return;

  this.httpClient.delete(`${this.apiUrl}/${productId}`).subscribe({
    next: () => {

      // 🔥 Instantly remove from UI (No refresh)
      this.inventoryDto = this.inventoryDto.filter(
        item => item.productId !== productId
      );

      alert("Product deleted successfully");

    },
    error: (err) => {
      console.error("Delete failed:", err);
    }
  });
}





}
