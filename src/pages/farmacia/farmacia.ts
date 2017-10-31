import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Geoposition } from "@ionic-native/geolocation";
import { Dataservice } from '../../providers/dataservice';
import { Icono } from '../../clases/icono';
import { Turnos } from '../../clases/turnos';
@Component({
  selector: 'page-farmacia',
  templateUrl: 'farmacia.html',
})
export class FarmaciaPage {
  
  ubicacion ={lat:-41.138151,lng:-71.297480};
  public markers=[];
  public marcadores=[];
  
  public dateFormat = require('dateformat');
 
  public contador:number=0;
  public start:string="";
  public end:string="";
  public start2:string="";
  public end2:string="";
  public isLV:Boolean=true;
  public isS:boolean=true;
  public isD:boolean=true;
  public now = new Date();
  public numeroDia=this.dateFormat(this.now,"N");//dar formato a las horas ya que lo anterior de js no funcionaba
  public icono:Icono[]=[];
  public turnos: Turnos[]=[];
  //public turnos=[]
  
  //turno=[];
  turno1=[];
  turno2=[];
  turnos1;
  turnos2;
  turnos3;
  public turno3=[];
  

   public id1='';
   public id2='';
   public id3='';
   public  dia;
   public Tid1='';
   public Tid2='';
   public Tid3='';
   public  Tdia;
   public string;
   public hoy=this.dateFormat(new Date(),"dd-mm");

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private geolocation: Geolocation,
              public dataService: Dataservice ) {
                this.icono=[];
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Farmacia');
this.cargarIconoAbierto();
//this.dataService.cargarTurno();
    //this.estadeTurno();
    this.cargarTurno();
   this.turnos=this.dataService.turnoget();

   console.log("get turno 0:", this.turnos);
    this.geolocation.getCurrentPosition({ timeout: 6000})
    .then(info=>{
      this.ubicacion.lat= info.coords.latitude,
      this.ubicacion.lng= info.coords.longitude
     })
    .catch(error=>{
      let toast = this.toastCtrl.create({
        message:'No se pudo encontrar la ubicación',
        duration:2000
      });
      toast.present();
    });
    this.dataService.obtenerdatos().subscribe(
      (datos)=>{
        this.markers=datos;
      }
    );
   /* this.dataService.obtenerturnos().subscribe(
      (datos)=>{
        this.turno=datos;
        console.log(this.turno)
        let contador=0;
        this.hoy=this.hoy.toString();
        for(let item of this.turno ) {
          if(this.hoy==item.dia){
            console.log(this.hoy,contador, item.dia);
            this.Tid1=item.idFarma1;
            this.Tid2=item.idFarma2;
            this.Tid3=item.idFarma3;
          }
        
         contador++;
         //this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
        }
      }
    );*/
    //let prueba=this.seleccionarIcono(12);
    //console.log("prueba",prueba);
    /*this.dataService.obtenerFarmaciasdeturno().subscribe((farma)=>{
      this.turno2=farma;
    });*/
    
  }
     cargarTurno(){

      
      this.dataService.obtenerturnos().subscribe(
        (datos)=>{
           let turno=datos;
          console.log(turno)
          
          this.hoy=this.hoy.toString();
          for(let item of turno ) {
            if(this.hoy==item.dia){
              console.log(this.hoy, item.dia);
              this.turnos[0]= {id:item.idFarma1};
              this.turnos[1]={id:item.idFarma2};
              this.turnos[2]={id:item.idFarma3};
              console.log("turnos: ", this.turnos);
            }
           //this.estadeTurno( item.dia,item.idFarma1,item.idFarma2,item.idFarma3);
          }
        }
        
      );
       

      /*let hoy=this.dateFormat(new Date(),"dd-mm");
      let ayer = new Date(new Date().setDate(new Date().getDate()-1));
      let now = new Date();
      ayer=this.dateFormat(ayer,"dd-mm");
      now= this.dateFormat(now,"HHMM");
      let cero= 0;
      let uno = 900;
      console.log("turno2 en seleccionar icono", this.turno3)
      if((Number(now)>Number(cero))&&(Number(now)<Number(uno))){
        hoy=ayer;
      }*/
     /* this.dataService.obtenerturnos().subscribe(
        (datos)=>{
          this.turno=datos;
          for(let item of this.turno) {
            this.dia=item.dia;
            this.id1=item.idFarma1;
            this.id2=item.idFarma2;
            this.id3=item.idFarma3;
            this.hoy=this.hoy.toString();
            this.dia=this.dia.toString();
            if(this.hoy==this.dia){ 
              this.Tdia=this.dia;
              this.Tid1=this.id1;
              this.Tid2=this.id2;
              this.Tid3=this.id3;
              console.log("dia", this.Tdia)
              if (Number(turnoId) == Number(this.Tid1)||Number(turnoId) ==Number(this.Tid2)||Number(turnoId) ==Number(this.Tid3)){//|| this.turno2[i].id==this.Tid2||this.turno2[i].id==this.Tid3
                //console.log("primer for"); 
                this.string="assets/icon/marker-blue.png";
                console.log("primer for", this.string);
                //return false;
              }else{
                this.string="assets/icon/marker-blue.png";
                console.log("primer for else", this.string);
                //return true;
              }
            }
          }
          console.log("fuera del for", this.string);
          return this.string;
        }) */
        console.log("fuera del servicio for", this.string);  
      }


cargarIconoAbierto(){
  this.dataService.obtenerdatos().subscribe(
    (datos)=>{
     // este codigo lo utilizo para recorrer el json y cargar los datos 
     //en un arreglo para abierto o cerrado 
      let farmacias=datos;
      for(let data of farmacias) {
       let iconos= this.seleccionarIcono(data);
       console.log ("icono prueba", iconos)
      if(this.numeroDia>=1 && this.numeroDia<=5){
        this.start=data.horario.lv[0].start1;
        this.end=data.horario.lv[1].end1;
        this.start2=data.horario.lv[2].start2;
        this.end2=data.horario.lv[3].end2;
        //this.icono [this.contador] = {id: data.id,valor: this.estaAbierto(this.start, this.end, this.start2, this.end2)};
       let icono1=this.estaAbierto(this.start, this.end, this.start2, this.end2);
        this.contador ++;
        console.log("icono:: ", icono1);
      }else if(this.numeroDia ==6){
        console.log("sabado");
        this.start=data.horario.s[0].start1;
        this.end=data.horario.s[1].end1;
        this.start2=data.horario.s[2].start2;
        this.end2=data.horario.s[3].end2;
        console.log(this.start,this.end,this.start2, this.end2 );
        //this.icono [this.contador].id=data.id;
        //this.icono [this.contador].valor = this.estaAbierto(this.start, this.end, this.start2, this.end2);
        this.contador ++;
      }else{
        //console.log("domingo");
        this.start=data.horario.d[0].start1;
        this.end=data.horario.d[1].end1;
        this.start2=data.horario.d[2].start2;
        this.end2=data.horario.d[3].end2;
        this.icono [this.contador].id=data.id;
        this.icono [this.contador].valor = this.estaAbierto(this.start, this.end, this.start2, this.end2);
        this.contador ++;
      }
        

      }
      console.log(this.icono);
      
    })
}

seleccionarIcono(options):any{
  console.log("seleccionaricono()", options);
  console.log("seleccionaricono()", options.horario.s[0].start)
  this.dateFormat.masks.hammerTime = 'HH:MM';
  let hoy =this.dateFormat(this.now, "HH:MM");
  //start=this.dateFormat(start,"HH:MM");
  hoy= hoy.toString();
  hoy= hoy.replace(":","");
  let abre = options.horario.s[0].start1;
  let cierra = options.horario.s[1].end1;
  let abre1 = options.horario.s[2].start2;
  let cierra1 = options.horario.s[3].end2;
  abre= abre.replace(":","");
  cierra= cierra.replace(":","");
  abre1= abre1.replace(":","");
  cierra1= cierra1.replace(":","");
  //console.log('today: '+hoy+' abre: '+ abre+ ' cierra: '+cierra);
  if((Number(hoy) > Number(abre) && Number(hoy) < Number(cierra))||(Number(hoy) > Number(abre1) && Number(hoy) < Number(cierra1))){//this.today>this.start && this.today<this.end
    //options.setIcon({'url':'www/assets/icon/marker-green.png'});
    let icono =  "'./assets/icon/marker-green.png'";
    return icono;
    //icon: {url:"./assets/icon/marker-green.png"}
    }else{
     // options.setIcon({'url':'www/assets/icon/marker-green.png'});
     let icono=  "'./assets/icon/marker-green.png'";
     return icono;
  }

}

estaAbierto(abre:string, cierra:string, abre1: string, cierra1: string){
  //console.log("estaAbierto()")
  this.dateFormat.masks.hammerTime = 'HH:MM';
  let hoy =this.dateFormat(this.now, "HH:MM");
  //start=this.dateFormat(start,"HH:MM");
  hoy= hoy.toString();
  hoy= hoy.replace(":","");
  abre= abre.replace(":","");
  cierra= cierra.replace(":","");
  abre1= abre1.replace(":","");
  cierra1= cierra1.replace(":","");
  //console.log('today: '+hoy+' abre: '+ abre+ ' cierra: '+cierra);
  if((Number(hoy) > Number(abre) && Number(hoy) < Number(cierra))||(Number(hoy) > Number(abre1) && Number(hoy) < Number(cierra1))){//this.today>this.start && this.today<this.end
    //return 2;
   // let icon='./assets/icon/marker-green.png';
    let icon ="'{url':'./assets/icon/marker-green.png}'";
    return icon;
  }else{
    //return 3;
    let icon='./assets/icon/marker-pink.png';
    //console.log("primer for else");
    return icon;
  }
}

    
   estadeTurno (dia:string, id1:string, id2: string, id3: string){
    //console.log("estadeTurno()");
    let hoy=this.dateFormat(new Date(),"dd-mm");
    let ayer = new Date(new Date().setDate(new Date().getDate()-1));
    let now = new Date()
     ayer=this.dateFormat(ayer,"dd-mm");
     now= this.dateFormat(now,"HHMM");
     let cero= 0;
     let uno = 900;
     //cero=this.dateFormat(cero,"HHMM");
    //let hoy1=this.dateFormat(new Date(-1),"dd");
    
    if((Number(now)>Number(cero))&&(Number(now)<Number(uno))){
      hoy=ayer;
    }
    hoy=hoy.toString();
    if(hoy==dia){    
      this.dataService.obtenerFarmaciasdeturno().subscribe((farma)=>{
        this.turno1=farma;
        for(let datos of this.turno1 ){//busca las farmacias de turno 24 hs
          if (datos.id==id1|| datos.id==id2||datos.id==id3){
            this.turno2.push(datos);
          }
        }
      })
      
    }
  } 
}
function newFunction() {
    return '0';
}

