import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductService, Product, Comment } from '../service/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product : Product;
  comments: Comment[];
  newRating:number=5;
  newComment:string="";
  isHiddenComment=true;
  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    let productId=this.routeInfo.snapshot.params["productId"];
    this.product=this.productService.getProduct(productId);
    this.comments=this.productService.getCommentForProductID(productId);
  }
  addComment()
  {
    let comment = new Comment(0,this.product.id,new Date().toISOString(),'userTest',this.newRating,this.newComment);
    this.comments.unshift(comment);
    let sum=this.comments.reduce((sum,comment)=>sum+comment.rating,0);
    this.product.rating=sum/this.comments.length;
    this.newRating=5;
    this.newComment=null;
    this.isHiddenComment=true;
    
  }

}
