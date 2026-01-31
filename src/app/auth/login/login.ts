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
    this.authService.login(this.email, this.password)
      .subscribe({
       // login.ts me login() ke andar
next: (res:any) => {
  console.log('Login success', res);
  // navigate after login
  window.location.href = '/todo'; // ya router.navigate(['/todo']) agar Router inject kiya hai
}

      });
  }
}
