import { Injectable, EventEmitter } from '@angular/core';
import { Observable , of} from 'rxjs'
import { HttpClient , HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    searchEvent:EventEmitter<ProductSearchParams> =new EventEmitter();
    constructor(private http:HttpClient) { }

    getAllCategories() :string[]{
      return["Computers","Tablets","Cameras","Phones"];
    }

    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>("/api/products")
        .pipe(
          catchError(this.handleError('getProducts', []))
        );
    }
    
    /**TODO: GET product by id. Will 404 if id not found */
    getProduct(id:number) :Observable<Product> {
      const url = `${"/api/product"}/${id}`;
      return this.http.get<Product>(url).pipe(
        
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
    }

    getCommentForProductID(id:number) :Observable<Comment[]> {
      return this.http.get<Comment[]>("/api/product/"+id+"/comments")
        .pipe(
          catchError(this.handleError('getCommentForProductID', []))
        );
    }

    search(params: ProductSearchParams): Observable<Product[]> {
      let search = new HttpParams();
      search = this.encodeParams(params);
      return this.http.get<Product[]>("/api/products",{params:search})
        .pipe(
          catchError(this.handleError('getProducts', []))
        );
    }
    
    private encodeParams(params: ProductSearchParams){
      return Object.keys(params)
        .filter(key=>params[key])
        .reduce((sum:HttpParams,key:string)=>{
     // pls be careful here, because HttpParams is immutable, when you use append() it returns a new instance of HttpParams
     // if use URLSearchParams here //* sum.append(key,params[key]);*// 
        sum=sum.append(key,params[key]);
        return sum;
        },new HttpParams());
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

export class ProductSearchParams{
  constructor(
    public title: string,
    public price: number,
    public category:string
  ){}
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