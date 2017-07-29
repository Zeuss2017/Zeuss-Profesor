import {Component, OnInit} from '@angular/core';
import {ColegioService} from '../service/colegio.service';
import {ProfesorService} from '../service/profesor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Profesor} from '../model/profesor.model'
import {Colegio} from '../model/colegio.model'

@Component({
    moduleId: module.id,
    selector: 'registro',
    templateUrl: 'registro.component.html'
})
export class RegistroComponent implements OnInit {
    profesor: Profesor= new Profesor(0,'','','');
    colegios: Array<Colegio> = [];
    errorMessage = '';
    idColegio=0;
    existeUser=true;
    sepuede=0;
    message='';
    constructor(
        private serviceColegio: ColegioService,
        private serviceProfesor: ProfesorService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        
        this.serviceColegio.findAll()
            .subscribe(
            retrievedColegios => this.colegios = retrievedColegios,
            error => this.errorMessage = "Opción no permitida"
            );
    }
    
    registrar(){
        if(this.existeUser){
            this.message='';
        this.serviceProfesor.create(this.profesor)
            .subscribe(
            success => this.router.navigate(['/login']),
            error => this.message = 'El username ya existe, escoja otro'
            );  

        this.serviceProfesor.asociarColPro(this.idColegio,this.profesor.username)
            .subscribe(
            success => this.message='Exito',
            error => this.errorMessage = "Opción no permitida"
            );
        }
       
        
    }
    
    verificarUsername(){
        this.serviceProfesor.veriUsername(this.profesor.username)
            .subscribe(
            retrievedUsername => {
                this.sepuede = retrievedUsername;
                console.log(this.sepuede);
                if(this.sepuede==1){
                    this.message="";
                    this.existeUser=true;
                }
                else{
                    
                    this.message="Escoja otro usuario";
                    this.existeUser=false;
                }
            },
            error => this.errorMessage = "Opción no permitida"
            );
    }   
}

