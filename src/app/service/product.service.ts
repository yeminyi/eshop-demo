import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
    constructor(private http:HttpClient) { }
    getAllCategories() :string[]{
      return["Computers","Tablets","Book","Phones"];
    }
    getProducts(): Observable<Product[]> {
      // return this.http.get("/api/products").map(res=>res.json());
      return this.http.get<Product[]>("/api/products")
        .pipe(
          catchError(this.handleError('getProducts', []))
        );
    }
    
    /**TODO: GET product by id. Will 404 if id not found */
    getProduct(id:number) :Observable<Product> {
      // return this.products.find((product)=>product.id==id);
      const url = `${"/api/product"}/${id}`;
      return this.http.get<Product>(url).pipe(
        
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
    }
    getCommentForProductID(id:number) :Observable<Comment[]> {
      // return this.comments.filter((comment: Comment)=>comment.productId==id);
      return this.http.get<Comment[]>("/api/product/"+id+"comments")
        .pipe(
          catchError(this.handleError('getCommentForProductID', []))
        );
    }
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
export class Product{
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){}
}
export class Comment{
  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string
  ){}
}