import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-materias-screen',
  templateUrl: './registro-materias-screen.component.html',
  styleUrls: ['./registro-materias-screen.component.scss']
})
export class RegistroMateriasScreenComponent {

  public materia:string = "registro-materias";
  //JSON para los usuarios (admin, maestros, alumnos)
  public user:any ={};

  public isUpdate:boolean = false;
  public errors:any = {};
  //Banderas para el tipo de usuario
  public isAdmin:boolean = false;

  public editar: boolean = false;
  public tipo_user:string = "";
  //Info del usuario
  public idUser: Number = 0;
  public rol: string = "";


}
