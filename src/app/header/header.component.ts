import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';
import { CartService } from '../products/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartItemCount:number=0

  constructor(private api:ApiService,private cart: CartService){

  }

  ngOnInit(): void {

    // this.api.getCart().subscribe(
    //   (result:any)=>{
    //     result.forEach((item:any)=>this.cartItemCount+=item.quantity)
    //   }
    // )

    this.cart.cartItemList.subscribe(
      (data:any)=>{
        console.log(data);
        this.cartItemCount = data
      }
    )
  }

  search(event:any){
    let searchTerm = event.target.value
    this.api.searchKey.next(searchTerm)
  }
  
}
