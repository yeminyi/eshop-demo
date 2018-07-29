import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductService, Product, Comment } from '../service/product.service';
import { WebSocketService } from '../service/web-socket.service';
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
  isWatched:boolean=false;
  currentBid:number;
  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService,
              private wsService:WebSocketService) { }

  ngOnInit() {
    let productId=this.routeInfo.snapshot.params["productId"];
    this.productService.getProduct(productId).subscribe(
      product =>{
        this.product=product;
        this.currentBid=product.price;
      }
     
    );
    this.productService.getCommentForProductID(productId).subscribe(
      comments=>this.comments=comments
    );
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
  watchProduct(){
    this.isWatched=!this.isWatched;
    this.wsService.createObservableSocket("ws://localhost:8085",this.product.id)
    .subscribe(
      products=>{
        let product =JSON.parse(products).find(p=>p.productId===this.product.id)
        this.currentBid=product.bid;
      }
    ) ;
  }
}
