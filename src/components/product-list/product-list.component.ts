import { Component, Input } from "@angular/core"
import { Product } from "../../models/product"
import { ProductCardComponent } from "../product-card/product-card.component"

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent {
  @Input()
  public products!: Product[]
}
