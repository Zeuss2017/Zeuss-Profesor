import {Component, OnInit} from '@angular/core';
import {CursoService} from '../service/curso.service';
import {ProfesorService} from '../service/profesor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Profesor} from '../model/profesor.model'
import {Curso} from '../model/curso.model'

@Component({
    moduleId: module.id,
    selector: 'curso',
    templateUrl: 'curso.component.html'
})
export class CursoComponent implements OnInit {
    cursos: Array<Curso> = [];
    message='';
    currentUser=new Profesor(0,'','','');
    constructor(
        private serviceCurso: CursoService,
        private serviceProfesor: ProfesorService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('USER'));
        
        this.serviceCurso.findByUsername(this.currentUser.username)
            .subscribe(
            retrievedCursos => this.cursos = retrievedCursos,
            error => this.message = "Opción no permitida"
            );
    }

    
}

