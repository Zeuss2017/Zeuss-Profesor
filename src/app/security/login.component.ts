import {Component} from '@angular/core';
import {AuthService} from 'app/service/auth.service';

import {ActivatedRoute, Router} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent  {

    loginCredentials = {username: '', contrasena: ''};
    message = "";

    constructor(
        private service: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}


    login() {
        this.service.login(this.loginCredentials.username, this.loginCredentials.contrasena)
            .subscribe(
            user => {
                localStorage.setItem('USER', JSON.stringify(user));
                this.router.navigate(['curso/list']);
            },
            error => this.message = 'Usuario y/o contraseña incorrecto' 
           );
    }

}

