import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.html',
  styleUrls: ['./manage-products.css']
})
export class ManageProductComponent implements OnInit {
  products: any[] = [];
  errorMessage = '';

  newProduct = {
  name: '',
  price: 0,
  stock: 0,
  image: ''
};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products';
      }
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.fetchProducts();
        this.newProduct = { name: '', price:0 , stock: 0, image: '' };
      },
      error: () => {
        this.errorMessage = 'Failed to add product';
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== id);
        },
        error: () => {
          this.errorMessage = 'Failed to delete product';
        }
      });
    }
  }
}
