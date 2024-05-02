import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from '../../services/materias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  // para las contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public materia: any = {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  // check
  public valoresCheckbox: any = [];
  public dias_json: any = [] = [];

    //Para el select
  public programa_educativo: any[] = [
    {value: '1', viewValue: 'Ingeniería en Ciencias de la Computación'},
    {value: '2', viewValue: 'Licenciatura en Ciencias de la Computación'},
    {value: '3', viewValue: 'Ingeniería en Tecnologías de la Información'},
  ];

  public dias:any[]= [
    {value: '1', nombre: 'Lunes'},
    {value: '2', nombre: 'Martes'},
    {value: '3', nombre: 'Miercoles'},
    {value: '4', nombre: 'Jueves'},
    {value: '5', nombre: 'Viernes'},
    {value: '6', nombre: 'Sabado'},
  ];

  constructor(
    private location : Location,
    private materiasService: MateriasService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.materia = this.datos_user;
    }else{
      this.materia = this.materiasService.esquemaMateria();
      this.materia.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Materia: ", this.materia);

  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //validar
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }


  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiasService.editarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia editado correctamente");
        console.log("Materia editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo editar la materia");
      }
    );
  }

  public checkboxChange(event:any){
    console.log("Evento: ", event);
    if(event.checked){
      this.materia.dias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.materia.dias_json.forEach((dia, i) => {
        if(dia == event.source.value){
          this.materia.dias_json.splice(i,1);
        }
      });
    }
    console.log("Array dias: ", this.materia);
  }

  public revisarSeleccion(nombre: string){
    if(this.materia.dias_json){
      var busqueda = this.materia.dias_json.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

}
