import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { delay, map, Observable } from "rxjs"
import { Product } from "../models/product"
import { environment } from "../environments/environment"

interface GetProductsInput {
  searchQuery?: string
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public getProducts(input: GetProductsInput = {}): Observable<Product[]> {
    const { searchQuery = "" } = input

    return this.http.get<Product[]>(environment.apiURLProducts).pipe(
      delay(1_000),
      map((products) => {
        if (searchQuery.length === 0) {
          return products
        }
        return products.filter((product) => {
          return product.title.toLowerCase().includes(searchQuery.toLowerCase())
        })
      }),
    )
  }
}
