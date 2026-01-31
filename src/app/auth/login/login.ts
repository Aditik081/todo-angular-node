import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';

  constructor(private authService: AuthService) {}

 login() {
  if (!this.email || !this.password) {
    alert('Email and password are required');
    return;
  }

  this.authService.login(this.email, this.password)
    .subscribe({
      next: () => window.location.href = '/todo',
      error: (err) =>
        alert(err.error?.message || 'Invalid email or password')
    });
}

  }

