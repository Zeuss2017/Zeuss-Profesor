import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

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
        private router: Router
    ) {}
    
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('USER'));
        console.log("inicio"+this.currentUser);
        if(this.currentUser!=null){
            this.esUser=true;
        }
    }
    ngDoCheck(){
        this.currentUser = JSON.parse(localStorage.getItem('USER'));
        console.log("segundo"+this.currentUser);
        if(this.currentUser!=null){
            this.esUser=true;
            
        }
    }
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

