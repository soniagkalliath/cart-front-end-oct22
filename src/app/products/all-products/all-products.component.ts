import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products:any=[]
  searchItem:string=""

  constructor(private api:ApiService){
  }

  ngOnInit(): void {
    this.api.getAllProducts()
    .subscribe((result:any)=>{
      this.products = result
      console.log(this.products);
    })
//to get search term from header component using behavior subject in api service
   this.api.searchKey
   .subscribe((result:any)=>{
    console.log(result);
    this.searchItem = result
   })
  
    
  }


}
