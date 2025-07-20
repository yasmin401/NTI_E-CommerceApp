import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/products')
      .subscribe({
        next: (res) => this.products = res,
        error: (err) => console.error('Failed to fetch products', err)
      });
  }
  addToCart(product: any): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add to cart');
      return;
    }

    const body = {
      productId: product._id,
      quantity: 1
    };

    this.http.post('http://localhost:3000/api/cart/add', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => alert('✅ Added to cart successfully'),
      error: () => alert('❌ Failed to add to cart')
    });
  }


  viewDetails(product: any): void {
    this.router.navigate(['/product-details', product._id]);
  }


}
