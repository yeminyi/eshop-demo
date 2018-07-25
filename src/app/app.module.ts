import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarsComponent } from './stars/stars.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule} from '@angular/router';
import { ProductService } from './service/product.service';
import { FilterPipe } from './pipe/filter.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
const routeConfig: Routes=[
  {path:'',component: HomeComponent},
  {path:'product/:productId',component:ProductDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StarsComponent,
    NavbarComponent,
    SearchComponent,
    CarouselComponent,
    FooterComponent,
    ProductComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
