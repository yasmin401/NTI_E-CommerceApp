import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.http.get('http://localhost:3000/api/orders/my-orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (res: any) => {
        this.orders = res.orders || [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load orders';
        this.isLoading = false;
      }
    });
  }
}
