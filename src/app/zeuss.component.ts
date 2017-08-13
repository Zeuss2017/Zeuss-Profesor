import { ProfesorService } from './service/profesor.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
/**
 * Componente inicial de Zeuss
 * @param {esUser} esUser variable que guarda si hay un usuario logeado
 */
@Component({
    moduleId: module.id,
    selector: 'zeuss',
    templateUrl: 'zeuss.component.html'
})
export class ZeussComponent {
    
    esUser=false;
    currentUser=null;
    
    constructor(
        private service: AuthService,
        private route: ActivatedRoute,
        private serviceProfesor:ProfesorService,
        private router: Router
    ) {}
    
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('USER'));
        
        if(this.currentUser!=null){
            this.esUser=true;
        }
    }
    ngDoCheck(){
        this.currentUser = JSON.parse(localStorage.getItem('USER'));

        if(this.currentUser!=null){
            this.esUser=true;
        }
    }
    /**
     * @param
     * 
     */
    logout() {
        this.service.logout()
            .subscribe(
                success => {
                    localStorage.removeItem('USER');
                    this.router.navigate(['login']);
                    this.currentUser=null;
                    this.esUser=false;
                },
                error => console.log('error ' + error)
            )
        
    }
}

