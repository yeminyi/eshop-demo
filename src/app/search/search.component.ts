import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { retry } from 'rxjs/operators';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;
  categories:string[];
  selectCategory="All Category";
  constructor(private productService:ProductService) {
    let fb =new FormBuilder();
    this.formModel=fb.group({   
      title:['',Validators.minLength(3)],
      price:[null,this.positiveNumberValidator],
      category:['-1']
    });
   }

  ngOnInit() {
    this.categories=this.productService.getAllCategories();
    this.categories.unshift(this.selectCategory);
  }
  positiveNumberValidator(control:FormControl):any{
    if (!control.value){
      return null;
    }
    let price =parseInt(control.value);
    if(price >0){
      return null;
    }else{
      return {
        positiveNumber:true
      }
    }
  }
  onSearch(){
    if(this.formModel.valid){
      console.log(this.formModel.value);
      
    }
  }
  selectBtn(category){
    console.log(category);
    this.selectCategory=category;

  }
}
