import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <button routerLink="/login">Login</button>
      <button routerLink="/register">Register</button>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
