import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    this.isLoading = true;
this.http.get<any>('http://localhost:3000/api/cart', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  }
}).subscribe({
  next: (res) => {
    this.cartItems = res.items || [];
    this.isLoading = false;
  },
  error: () => {
    this.errorMessage = 'Failed to load cart';
    this.isLoading = false;
  }
});

  }

  removeFromCart(productId: string): void {
    this.http.delete(`http://localhost:3000/api/cart`, {
      body: { productId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: () => this.fetchCart(),
      error: () => alert('Failed to remove item')
    });
  }

  increaseQuantity(productId: string): void {
    const item = this.cartItems.find(i => i.product._id === productId);
    if (item) {
      const newQty = item.quantity + 1;
      this.updateQuantity(productId, newQty);
    }
  }

  decreaseQuantity(productId: string): void {
    const item = this.cartItems.find(i => i.product._id === productId);
    if (item && item.quantity > 1) {
      const newQty = item.quantity - 1;
      this.updateQuantity(productId, newQty);
    } else if (item && item.quantity === 1) {
      this.removeFromCart(productId);
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    this.http.put(`http://localhost:3000/api/cart`, { productId, quantity }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: () => this.fetchCart(),
      error: () => alert('Failed to update quantity')
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
}
