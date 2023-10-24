import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  cartCount = new Subject<number>();
  totalPrice = new Subject<number>();

  constructor(private http: HttpClient) {}

  changeCartCount(val: number) {
    this.cartCount.next(val);
  }

  getAllCarts() {
    return this.http.get('http://localhost:3000/carts');
  }

  getUserById(id: number) {
    let token = 'admin-token';
    return this.http.get<User>('http://localhost:3000/users/' + id, {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    });
  }

  submitCarts(cart: any) {
    return this.http.post('http://localhost:3000/carts', cart);
  }
}
