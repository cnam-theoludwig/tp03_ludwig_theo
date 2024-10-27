import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ProductListComponent } from "./product-list.component"
import { PRODUCTS_MOCK } from "../../models/product"

describe("ProductListComponent", () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    component.products = PRODUCTS_MOCK
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
