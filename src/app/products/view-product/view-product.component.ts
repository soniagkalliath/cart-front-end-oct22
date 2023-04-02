import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productId:any;
  viewProduct:any;
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService,private cart:CartService,private router:Router){

  }

  ngOnInit(): void {
    // fetch pathparameter from url
    this.activatedRoute.params
    .subscribe((data:any)=>{
      console.log(data['id']);
      this.productId = data['id']
    })

    this.api.viewProduct(this.productId)
    .subscribe((result:any)=>{
      console.log(result);
      this.viewProduct = result
    })
  }

  //addtowishlist(viewProduct)
  addtowishlist(product:any){
    this.api.addtowishlist(product)
    .subscribe(
      (result:any)=>{
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  //addToCart(viewProduct)
  addToCart(product:any){
    Object.assign(product,{quantity:1});
    console.log(product);
    
   // this.cart.addToCart(product)
   this.api.addtocart(product)
   .subscribe(
    (result:any)=>{
      console.log(result);
      
      alert(result)
     
    },
    (result:any)=>{
      alert(result.error)
    }
   )
  }

}
