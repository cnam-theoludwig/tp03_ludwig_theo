import { Component, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { FooterComponent } from "../components/footer/footer.component"
import { HeaderComponent } from "../components/header/header.component"
import { Observable } from "rxjs"
import { Product } from "../models/product"
import { ApiService } from "../services/api.service"
import { AsyncPipe } from "@angular/common"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  public title = "tp03_ludwig_theo"
  public products!: Observable<Product[]>

  public constructor(private readonly apiService: ApiService) {}

  public ngOnInit(): void {
    this.products = this.apiService.getProducts()
  }
}
