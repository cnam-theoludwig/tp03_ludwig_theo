import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { delay, Observable } from "rxjs"
import { Product } from "../models/product"
import { environment } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    let productsObservable = this.http.get<Product[]>(environment.apiURL)
    productsObservable = productsObservable.pipe(delay(800))
    return productsObservable
  }
}
