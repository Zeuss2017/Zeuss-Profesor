

export class ResultadoAct {
    constructor(
        public id: number, 
        public totalAciertos:number,
        public totalErrores:number,
        public totalTiempo:number,
        public maxNivel: number, 
        public totalEjRealizados: number) {}
}