import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { product } from 'src/app/dto/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  BaseUrl:string="https://localhost:7200/api/Product";

  constructor(private _http:HttpClient) { }

  getproducts(): Observable<any> {
    
    var data=this._http.get(this.BaseUrl);
    return data;

  }
  addproduct(product:product):Observable<product>{
    var data=this._http.post<product>(this.BaseUrl,product);
    this.getproducts();
    return data;
    
  }
  deleteproduct(id:String){
    return this._http.delete(this.BaseUrl+"/"+id);
    
    
  }
  updateproduct(product:product):Observable<any>{

    return this._http.put(this.BaseUrl,product);
    
  }
}
