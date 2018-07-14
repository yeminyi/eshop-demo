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
  submitted = false;
 
  constructor(private productService:ProductService,private formBuilder: FormBuilder) {
    
    this.formModel=this.formBuilder.group({   
      title:['',Validators.minLength(3)],
      price:[null,this.positiveNumberValidator],
      category:['-1'],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
    this.categories=this.productService.getAllCategories();
    this.categories.unshift(this.selectCategory);
  }
  get name() { return this.formModel.get('name'); }
  get f()
  {
    return this.formModel.controls;
  }
  positiveNumberValidator(control:FormControl):any{
    console.log(control.value);
    
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

    this.submitted = true;

    // stop here if form is invalid
    if (this.formModel.invalid) {
      console.log(this.formModel.value);
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formModel.value))
  }
  selectBtn(category){
    console.log(category);
    this.selectCategory=category;

  }

}
