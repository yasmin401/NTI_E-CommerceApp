import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

addProduct(product: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  return this.http.post(`${this.apiUrl}/products`, product, { headers });
}



  updateProduct(id: string, updatedProduct: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, updatedProduct);
  }

deleteProduct(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.delete(`${this.apiUrl}/products/${id}`, { headers });
}
  }

