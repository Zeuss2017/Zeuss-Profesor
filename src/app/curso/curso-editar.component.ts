import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CursoService} from '../service/curso.service';
import {Curso} from '../model/curso.model'
import { Profesor } from "../model/profesor.model";

@Component({
    moduleId: module.id,
    selector: 'curso-editar',
    templateUrl: 'curso-editar.component.html'
})
export class CursoEditarComponent implements OnInit {

    curso: Curso = new Curso(0,'','',0);
    errorMessage = "";
    currentUser=new Profesor(0,'','','');
    crear=true;
    constructor(
        private service: CursoService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('USER'));
        let id = this.route.snapshot.params['id'];
        console.log("ID: "+id)
        if (id) {
            this.crear=false;
            this.service.find(+id)
                .subscribe(
                curso => this.curso = curso,
                error => this.errorMessage = "Error: " + JSON.stringify(error)
                );
        }
        
    }

    saveCurso() {
        if (this.curso.id) {
            this.service.edit(this.curso)
                .subscribe(
                success => this.router.navigate(['/curso/list']),
                error => this.errorMessage = "Opción no permitida"
                );
        } else {
            console.log("save " + " " + JSON.stringify(this.curso));
            this.service.create(this.curso)
                .subscribe(
                idCurso => this.curso.id = idCurso,
                //success => this.router.navigate(['/curso/list']),
                error => this.errorMessage = "Opción no permitida"
                );
           setTimeout(() => {
            
               this.service.asociarProCurso(this.curso.id,this.currentUser.username)
                .subscribe(
                success => this.router.navigate(['/curso/list']),
                error => this.errorMessage = "Opción no permitida"
                );
               }, 500);
            
        }
    }

}

