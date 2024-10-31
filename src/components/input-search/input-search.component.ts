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

  @Input()
  public searchQuery: string = ""

  @Output()
  public changeSearch = new EventEmitter<string>()

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    this.changeSearch.emit(inputElement.value)
  }

  clearSearch(): void {
    this.changeSearch.emit("")
  }
}
