import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  filteredProducts = new Subject<any>()
  categories:string[]=[]
  categoriesObs = new Subject<any>()
  ProductsByCategory = new Subject<any>()
  constructor(private http: HttpClient) {}

  getAllProducts() {
    // return this.http.get<Product>(environment.baseApi + 'products');
    return this.http.get<Product>('http://localhost:3000/products');
  }

  getSingleProduct(id: number) {
    // return this.http.get<Product>(environment.baseApi + 'products/' + id);
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  // getProductsByCategory(category: string) {
  //   return this.http.get<Product>(environment.baseApi + 'products/category/' + category);
  // }
  getCategories() {
    // return this.http.get(environment.baseApi + 'products/categories');
    this.http.get<Product[]>('http://localhost:3000/products').subscribe(res=>{
      res.forEach(element => {
        if(!this.categories.includes(element.category)){
          this.categories.push(element.category)
        }
      });
      this.categoriesObs.next(this.categories)
    })
    return this.categoriesObs
    // return this.http.get<Product>('http://localhost:3000/categories');
  }

  editProduct(newProduct : Product, id:number){
    return this.http.put('http://localhost:3000/products/'+id,newProduct)
  }
  AddProduct(newProduct:Product){
    return this.http.post('http://localhost:3000/products/',newProduct)
  }
}
