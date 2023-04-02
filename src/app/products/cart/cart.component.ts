import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems:any=[]
  grantTotal:number=0
  discount:number=0
  discountTotal:number=0
  checkoutMsg=""
  total:number=0
  decStatus:boolean=false
  quantity:number=0
  constructor(private cart:CartService,private router:Router,private api:ApiService){
  }

  ngOnInit(): void {

    this.getCart()
  //   this.cart.cartItemList.subscribe(
  //     (data:any)=>{
  //       this.cartItems = data
  //     }
  //   )
  //     let total = this.cart.grantTotal()
  //     this.grantTotal = Number(total.toFixed(2))
  //     this.discountTotal = this.grantTotal
  }

  //get cat
  getCart(){
    this.api.getCart().subscribe(
      (result:any)=>{
        this.cartItems = result
        this.getCartItemCount()
        
        this.getTotal()
      },
      (result:any)=>{
        alert(result.error)
      }
    )
  }

  //get total
   getTotal(){
    if(this.cartItems){
      this.cartItems.forEach((item:any)=>{
        this.total+= item.grantTotal
        this.grantTotal = Number(this.total.toFixed(2))
        this.discountTotal = this.grantTotal
      })
    }
    
   }

   getCartItemCount(){
    this.cartItems.forEach((item:any)=>{
      this.quantity+= item.quantity
      this.cart.cartItemList.next(this.quantity)
     })
   }


   //increment cart item quantity
   incCartItem(productId:any){
    this.api.incCartItem(productId).subscribe(
      (result:any)=>{
        this.cartItems = result
       
        let updatedItem =this.cartItems.find((item:any)=>item.id==productId)
        this.quantity += 1
        this.cart.cartItemList.next(this.quantity)
        this.grantTotal += updatedItem.price
        this.discountTotal = this.grantTotal
      },
      (result:any)=>{
        alert(result.error)
      }
    )
   }

     //decrement cart item quantity
     decCartItem(productId:any){
      this.api.decCartItem(productId).subscribe(
        (result:any)=>{
          this.cartItems = result
          
          let updatedItem =this.cartItems.find((item:any)=>item.id==productId)
          if(!updatedItem){
            this.decStatus=true
            this.getCart()
            window.location.reload()
          }
          this.quantity -= 1
        this.cart.cartItemList.next(this.quantity)
          this.grantTotal -= updatedItem.price
          this.discountTotal = this.grantTotal
        },
        (result:any)=>{
          alert(result.error)
        }
      )
     }

  //removeItem(product)
  removeItem(product:any){
    this.api.removeCartItem(product.id)
    .subscribe((result:any)=>{
      this.cartItems =result
      if(this.cartItems.length==0){
        this.cart.cartItemList.next(0)
      }
      else{
        this.getCartItemCount()
      }
      
    })
  }

  //emptyCart()
  emptyCart(){
    this.api.emptyCart().subscribe((result:any)=>{
      this.cart.cartItemList.next(0)
      window.location.reload()
    },
    
    (result:any)=>{
      alert(result.error)
    })
  }

  //discount3percent()
  discount3percent(){
    this.discount = this.grantTotal * .03
    this.discountTotal -= this.discount
  }

  //discount10percent()
  discount10percent(){
    this.discount = this.grantTotal * .1
    this.discountTotal -= this.discount

  }

   //discount50percent()
   discount50percent(){
    this.discount = this.grantTotal * .5
    this.discountTotal -= this.discount

  }

  //checkout()
  checkout(){
    this.checkoutMsg = "Successfully Placed your order. Thank you.."
    setTimeout(() => {
      this.emptyCart()
       window.location.reload()
    }, 5000);
  }
  
}
