import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold search key from header component and share with all product component
  searchKey = new BehaviorSubject('')

  constructor(private http:HttpClient) {
    
   }

  //all-products api
  getAllProducts(){
  return  this.http.get('http://localhost:3000/products/all-products')
  }
  
  //view-product api
  viewProduct(productId:any){
   return this.http.get('http://localhost:3000/products/'+productId)
  }

  //add-to-wishlist api call
  addtowishlist(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      description:product.description,
      category:product.category,
      image:product.image
    }
    return this.http.post('http://localhost:3000/products/add-to-wishlist',body)
  }

  //get-wishlist api call
  getWishlist(){
    return this.http.get('http://localhost:3000/get-wishlist')
  }

  //remove-item-wishlist/:productId api call
  removeItemFromWishlist(productId:any){
    return this.http.delete('http://localhost:3000/wishlist/remove-item/'+productId)
  }

  //products/add-to-cart
  addtocart(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post('http://localhost:3000/products/add-to-cart',body)
  }

  //get-cart
  getCart(){
    return  this.http.get('http://localhost:3000/get-cart')
    }

    //cart/increment-item/:id
    incCartItem(id:any){
      return  this.http.get('http://localhost:3000/cart/increment-item/'+id)
    }

    //cart/decrement-item/:id
    decCartItem(id:any){
      return  this.http.get('http://localhost:3000/cart/decrement-item/'+id)
    }

    //cart/remove-item/:id
    removeCartItem(id:any){
      return  this.http.delete('http://localhost:3000/cart/remove-item/'+id)
    }

    //emoty cart
    emptyCart(){
      return  this.http.delete('http://localhost:3000/empty-cart')
    }
}
