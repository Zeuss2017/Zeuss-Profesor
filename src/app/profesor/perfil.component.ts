import { Component, OnInit } from '@angular/core';
import { ColegioService } from '../service/colegio.service';
import { ProfesorService } from '../service/profesor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from '../model/profesor.model'
import { Colegio } from '../model/colegio.model'

@Component({
    moduleId: module.id,
    selector: 'perfil',
    templateUrl: 'perfil.component.html'
})
export class PerfilComponent implements OnInit {

    errorMessage = '';
    existeUser = true;
    sepuede = 0;
    message = '';
    profesor = new Profesor(0, '', '', '');
    colegio = new Colegio(0, '', '', 0, '', '');
    constructor(
        private serviceColegio: ColegioService,
        private serviceProfesor: ProfesorService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.profesor = JSON.parse(localStorage.getItem('USER'));
        this.serviceProfesor.getColegio(this.profesor.username)
            .subscribe(
            colegio => this.colegio = colegio
            )
    }

    guardar() {

        this.message = '';
        this.serviceProfesor.edit(this.profesor)
            .subscribe(
            success => {
                localStorage.setItem('USER', JSON.stringify(this.profesor));
                this.router.navigate(['/perfil']);
            },
            error => this.message = 'El username ya existe, escoja otro'
            );

    }
}

