import {Component, OnInit} from '@angular/core';
import {CursoService} from '../service/curso.service';
import {EstudianteService} from '../service/estudiante.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Estudiante} from '../model/estudiante.model'
import {Curso} from '../model/curso.model'

@Component({
    moduleId: module.id,
    selector: 'estudiante',
    templateUrl: 'estudiante.component.html'
})
export class EstudianteComponent implements OnInit {
    estudiantes: Array<Estudiante> = [];
    curso: Curso = new Curso(0,'','',0);
    message='';
    currentUser='';
    constructor(
        private serviceCurso: CursoService,
        private service: EstudianteService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        
        let id = this.route.snapshot.params['id'];
        
        if (id) {
            
            this.service.findByCurso(+id)
                .subscribe(
                estudiantes => this.estudiantes = estudiantes,
                error => this.message = "Error: " + JSON.stringify(error)
                );
            this.serviceCurso.find(+id)
                .subscribe(
                curso => this.curso = curso,
                error => this.message = "Error: " + JSON.stringify(error)
                );
        }

    }

    
}

