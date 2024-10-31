import { AsyncPipe } from "@angular/common"
import { Component, OnDestroy, OnInit } from "@angular/core"
import { RouterOutlet, ActivatedRoute, Router } from "@angular/router"
import { merge, Observable, Subject, Subscription } from "rxjs"
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  map,
} from "rxjs/operators"
import { FooterComponent } from "../components/footer/footer.component"
import { HeaderComponent } from "../components/header/header.component"
import { ProductListComponent } from "../components/product-list/product-list.component"
import { Product } from "../models/product"
import { ApiService } from "../services/api.service"
import { ProductListSkeletonComponent } from "../components/product-list-skeleton/product-list-skeleton.component"
import { InputSearchComponent } from "../components/input-search/input-search.component"

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
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit, OnDestroy {
  public products$!: Observable<Product[]>
  public isLoading = true
  public readonly searchQuery$ = new Subject<string>()
  private queryParamsSubscription!: Subscription

  public constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          return params["searchQuery"] ?? ""
        }),
        distinctUntilChanged(),
      )
      .subscribe((query) => {
        this.isLoading = true
        this.searchQuery$.next(query)
      })

    this.products$ = merge(
      this.searchQuery$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          return this.apiService.getProducts({ searchQuery: query })
        }),
      ),
      this.apiService.getProducts({ searchQuery: "" }),
    ).pipe(
      tap(() => {
        this.isLoading = false
      }),
    )
  }

  public ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
    this.searchQuery$.complete()
  }

  public async handleSearch(query: string): Promise<void> {
    this.isLoading = true
    this.searchQuery$.next(query)
    await this.router.navigate([], {
      queryParams: { searchQuery: query },
      queryParamsHandling: "merge",
    })
  }

  public onSubmit(event: Event): void {
    event.preventDefault()
  }
}
