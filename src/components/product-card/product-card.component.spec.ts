import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ProductCardComponent } from "./product-card.component"
import { PRODUCT_MOCK } from "../../models/product"

describe("ProductCardComponent", () => {
  let component: ProductCardComponent
  let fixture: ComponentFixture<ProductCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductCardComponent)
    component = fixture.componentInstance
    component.product = PRODUCT_MOCK
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
