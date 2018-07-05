import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products:Array<Product>;
  private imgUrl='http://placehold.it/320X150';

  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1,'Demo1',1.99,3.5,'This is the first Demo',['Computers','Tablets']),
      new Product(2,'Demo2',2.99,2.5,'This is the second Demo',['TVs']),
      new Product(3,'Demo3',3.99,4.5,'This is the third Demo',['Phones']),
      new Product(4,'Demo4',4.99,1.5,'This is the fourth Demo',['Phones']),
      new Product(5,'Demo5',5.99,3.5,'This is the fifth Demo',['Computers','Tablets']),
      new Product(6,'Demo6',6.99,2.5,'This is the sixth Demo',['Book']),
    ]
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