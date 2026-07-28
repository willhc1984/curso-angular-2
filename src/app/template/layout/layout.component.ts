import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})

export class LayoutComponent {

  constructor(private authService: AuthService, private router: Router){}

  logout(event: Event) : void {
    event.preventDefault();
    console.log(event);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
