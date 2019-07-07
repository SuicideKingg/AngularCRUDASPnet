import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Product } from './Product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:50418/api/Products';

@Injectable({
  providedIn: 'root'
})

export class APIWebServiceService {

  constructor(private http: HttpClient) { }

  private products = []; 

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl);
  }

  get_products() {
    return this.http.get(apiUrl, httpOptions);
  }

  getProduct(id: number) : Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url, httpOptions);
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Product>(url,httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  addProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(apiUrl, product, httpOptions)
      .pipe();
  }

  updateProduct(id: number,product:Product) {
    const url = `${apiUrl}/${id}`;
    return this.http.put<Product>(url,product, httpOptions);
  }

}
