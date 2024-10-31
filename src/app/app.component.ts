import { AsyncPipe } from "@angular/common"
import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router"
import { BehaviorSubject, merge, Observable, Subscription } from "rxjs"
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from "rxjs/operators"
import { FooterComponent } from "../components/footer/footer.component"
import { HeaderComponent } from "../components/header/header.component"
import { InputSearchComponent } from "../components/input-search/input-search.component"
import { ProductListSkeletonComponent } from "../components/product-list-skeleton/product-list-skeleton.component"
import { ProductListComponent } from "../components/product-list/product-list.component"
import { SelectCategoryComponent } from "../components/select-category/select-category.component"
import { Product } from "../models/product"
import { ApiService } from "../services/api.service"

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
    InputSearchComponent,
    SelectCategoryComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {
  public products$!: Observable<Product[]>
  public isLoading = false

  public readonly queryParams$ = new BehaviorSubject<{
    search: string
    categoryId: string
  }>({
    search: "",
    categoryId: "all",
  })
  private queryParamsSubscription = new Subscription()

  public constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          return {
            search: params["search"] ?? "",
            categoryId: params["categoryId"] ?? "all",
          }
        }),
        distinctUntilChanged(),
      )
      .subscribe((query) => {
        this.isLoading = true
        this.queryParams$.next(query)
      })

    this.products$ = merge(
      this.queryParams$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          return this.apiService.getProducts({
            search: query.search,
            categoryId: this.getCategoryIdFromString(query.categoryId),
          })
        }),
      ),
      this.apiService.getProducts({
        search: "",
        categoryId: undefined,
      }),
    ).pipe(
      tap(() => {
        this.isLoading = false
      }),
    )
  }

  public ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
    this.queryParams$.complete()
  }

  public async handleSearch(search: string): Promise<void> {
    this.isLoading = true
    await this.router.navigate([], {
      queryParams: { search },
      queryParamsHandling: "merge",
    })
  }

  public async handleCategory(categoryId: string): Promise<void> {
    this.isLoading = true
    await this.router.navigate([], {
      queryParams: { categoryId },
      queryParamsHandling: "merge",
    })
  }

  public onSubmit(event: Event): void {
    event.preventDefault()
  }

  private getCategoryIdFromString(categoryId: string): number | undefined {
    let categoryIdNumber: number | undefined = Number.parseInt(categoryId, 10)
    if (Number.isNaN(categoryIdNumber)) {
      categoryIdNumber = undefined
    }
    return categoryIdNumber
  }
}
