import { AsyncPipe } from "@angular/common"
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { Category } from "../../models/category"
import { ApiService } from "../../services/api.service"

@Component({
  selector: "app-select-category",
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: "./select-category.component.html",
  styleUrl: "./select-category.component.css",
})
export class SelectCategoryComponent implements OnInit {
  public categories$!: Observable<Category[]>

  public constructor(private readonly apiService: ApiService) {}

  public ngOnInit(): void {
    this.categories$ = this.apiService.getCategories()
  }

  @Input()
  public categoryId: string = "all"

  @Output()
  public selectCategory = new EventEmitter<string>()

  handleCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement
    this.selectCategory.emit(selectElement.value)
  }
}
