import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private imgUrl='http://placehold.it/320X150';
    private products : Product[]=[
      new Product(1,"Demo1",1.99,3.5,"This is the first Demo",["Computers","Tablets"]),
      new Product(2,"Demo2",2.99,2.5,"This is the second Demo",["TVs"]),
      new Product(3,"Demo3",3.99,4.5,"This is the third Demo",["Phones"]),
      new Product(4,"Demo4",4.99,1.5,"This is the fourth Demo",["Phones"]),
      new Product(5,"Demo5",5.99,3.5,"This is the fifth Demo",["Computers","Tablets"]),
      new Product(6,"Demo6",6.99,2.5,"This is the sixth Demo",["Book"]),
    ];
    private comments : Comment[]=[
      new Comment(1,1,"2018-02-03 22:12:12","Tom",3,"It is very good"),
      new Comment(2,1,"2018-02-03 12:02:12","Jerry",3,"It is good"),
      new Comment(3,2,"2018-02-03 08:12:12","Sam",2,"It is not bad"),
      new Comment(4,2,"2018-02-03 07:12:13","Bruce",1,"It is bad"),
      new Comment(5,2,"2018-02-03 19:12:12","Harry",2,"It is so so"),
   
    ];
    constructor() { }
    getProducts(): Product[] {
      return this.products;
    }
    getProduct(id:number) :Product {
      return this.products.find((product)=>product.id==id);
    }
    getCommentForProductID(id:number) :Comment[] {
      return this.comments.filter((comment: Comment)=>comment.productId==id);
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