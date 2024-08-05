import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Message } from '@fullstack-app/interfaces';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, CommonModule, FormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  hello$ = inject(HttpClient).get<Message>('/api');
  message$ = inject(HttpClient);
  message = '';
  savedMessage = '';

  onSaveMessage() {
    this.message$
      .post<Message>('/api', { message: this.message })
      .subscribe((response) => (this.savedMessage = response.message));
  }
}
