import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProductService, Product, Comment } from '../service/product.service';
import { WebSocketService } from '../service/web-socket.service';
import { Subscription } from '../../../node_modules/rxjs';
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
  subscrption:Subscription;
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
    if(this.subscrption){
      this.subscrption.unsubscribe();
      this.isWatched=false;
      this.subscrption=null;
    }
    else{
       this.isWatched=true;
       this.subscrption= this.wsService.createObservableSocket("ws://localhost:8085",this.product.id)
       .subscribe(
         products=>{
           let product =JSON.parse(products).find(p=>p.productId===this.product.id)
           this.currentBid=product.bid;
         }
       ) ;
    }
   
  }
}
