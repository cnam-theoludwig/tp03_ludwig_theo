import { Component, Input } from "@angular/core"
import { Product } from "../../models/product"
import { CurrencyPipe } from "@angular/common"

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.css",
})
export class ProductCardComponent {
  @Input()
  public product!: Product
}
