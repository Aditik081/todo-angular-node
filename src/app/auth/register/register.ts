import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  email = '';
  password = '';

  // <-- inject the service this way in standalone components
  private authService = inject(AuthService);

  register() {
    this.authService.register(this.email, this.password)
      .subscribe({
        // register.ts me register() ke andar
next: (res:any) => {
  console.log('Register success', res);
  window.location.href = '/login'; // ya router.navigate(['/login'])
}

      });
  }
}
