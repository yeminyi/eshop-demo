import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../service/product.service';
// import { FormControl } from '@angular/forms';
// import { debounceTime } from 'rxjs/operators';
import { Observable , of} from 'rxjs'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private imgUrl='http://placehold.it/320X150';
  private products :Observable<Product[]>;
  // private keyword: string;
  // private titleFilter: FormControl= new FormControl();
  constructor(private produceService: ProductService) {
    // this.titleFilter.valueChanges
    // .pipe(debounceTime(500))
    // .subscribe(
    //   value => this.keyword =  value
    // );
   }

  ngOnInit() {
    this.products=this.produceService.getProducts();
  }

}