import { Component } from '@angular/core';
import { QuotesService } from '../services/quotes.service';
import { CommonModule } from '@angular/common';
import { resource, Signal } from '@angular/core';

type Quotes = {
  _id: string;
  quote: string;
  author: string;
  published: string;
  title: string;
};

@Component({
  selector: 'app-display-quotes',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule],
  templateUrl: './displayquotes.component.html',
  styleUrl: './displayquotes.component.css'
})
export class DisplayQuotesComponent {
  constructor(private newQuotes: QuotesService) { }

  quotes: Quotes[] = [];

  async ngOnInit() {
    this.newQuotes.Get().subscribe(
      (quotes: typeof this.quotes) => {
        return (this.quotes = quotes);
      }
    )
  }
}

