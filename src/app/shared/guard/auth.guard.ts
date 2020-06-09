import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate() {
        console.log(this.authService.isAuthenticated());
        if ( !this.authService.isAuthenticated() ) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
