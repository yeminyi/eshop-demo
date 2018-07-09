import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private imgUrl='http://placehold.it/320X150';
  private products :Product[];
  constructor(private produceService: ProductService) { }

  ngOnInit() {
    this.products=this.produceService.getProducts();
  }

}