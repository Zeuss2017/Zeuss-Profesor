// Adapted from http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }
 
    canActivate() {
        if (localStorage.getItem('USER')) {
            return true;
        }
 
        this.router.navigate(['/login']);
        return false;
    }
}