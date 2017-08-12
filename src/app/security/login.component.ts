import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from './../service/auth.service';
import {Component} from '@angular/core';


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
        this.loginCredentials.contrasena=<string>Md5.hashStr(this.loginCredentials.contrasena);
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

