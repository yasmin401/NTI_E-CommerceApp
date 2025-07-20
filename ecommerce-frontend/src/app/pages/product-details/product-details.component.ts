import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading = true;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/api/products/${productId}`).subscribe({
      next: (res: any) => {
        this.product = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product';
        this.isLoading = false;
      }
    });
  }
}
