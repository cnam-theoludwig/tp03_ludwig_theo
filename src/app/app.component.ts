import { AsyncPipe } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Observable } from "rxjs"
import { FooterComponent } from "../components/footer/footer.component"
import { HeaderComponent } from "../components/header/header.component"
import { ProductListComponent } from "../components/product-list/product-list.component"
import { Product } from "../models/product"
import { ApiService } from "../services/api.service"
import { ProductListSkeletonComponent } from "../components/product-list-skeleton/product-list-skeleton.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AsyncPipe,
    ProductListComponent,
    ProductListSkeletonComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  public products!: Observable<Product[]>

  public constructor(private readonly apiService: ApiService) {}

  public ngOnInit(): void {
    this.products = this.apiService.getProducts()
  }
}
