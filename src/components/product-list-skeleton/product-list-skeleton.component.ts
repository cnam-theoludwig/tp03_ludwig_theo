import { Component } from "@angular/core"
import { ProductCardSkeletonComponent } from "../product-card-skeleton/product-card-skeleton.component"

@Component({
  selector: "app-product-list-skeleton",
  standalone: true,
  imports: [ProductCardSkeletonComponent],
  templateUrl: "./product-list-skeleton.component.html",
  styleUrl: "./product-list-skeleton.component.css",
})
export class ProductListSkeletonComponent {
  public skeletonItems = Array.from({ length: 10 })
}
