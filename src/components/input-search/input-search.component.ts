import { Component, EventEmitter, Input, Output } from "@angular/core"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-input-search",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./input-search.component.html",
  styleUrl: "./input-search.component.css",
})
export class InputSearchComponent {
  @Input()
  public placeholder: string = "Search..."

  @Output()
  public changeSearch = new EventEmitter<string>()

  public searchQuery: string = ""

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    this.searchQuery = inputElement.value
    this.changeSearch.emit(this.searchQuery)
  }

  handleClear(): void {
    this.searchQuery = ""
    this.changeSearch.emit("")
  }
}
