
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
//import { CvHLines } from './CvHLines.js';
import { CvZbuf } from './CvZbuf.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvZbuf;
let obj: Obj3D;
let ang: number=0;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvZbuf(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}
/*function leerArchivo() {
  const archivoURL = "../VentiladorModelo/Ventilador.dat"; // Ruta del archivo que deseas abrir

  fetch(archivoURL)
    .then((respuesta: Response) => {
      if (!respuesta.ok) {
        throw new Error(`No se pudo abrir el archivo: ${respuesta.status} ${respuesta.statusText}`);
      }
      return respuesta.text();
    })
    .then((contenido: string) => {
      mostrarContenido(contenido);
      const obj = new Obj3D();
      if (obj.read(contenido)) {
        const cv = new CvZbuf(graphics, canvas);
        cv.setObj(obj);
        cv.paint();
      }
    })
    .catch((error: Error) => {
      console.error('Error al abrir el archivo:', error);
    });
}*/


function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

function pza1TR() {
  let tr = 0.1;
 	
	
  for (let i = 17; i <= 20; i++){
    obj.w[i].x = obj.w[i].x + tr;
	}
	cv.setObj(obj);
  cv.paint();	
}
/*FuncionRotarVentilador */
function rotateObjectY(obj: any, af: number, totalIterations: number) {
  // Calcular el centro del objeto
  let center = calculateCenter(obj);

  // Inicializar la matriz de rotación utilizando el centro como punto de origen
  Rota3D.initRotate2(center, 0, Math.PI / 2, af * Math.PI / 180); // Girar en dirección a Y

  let currentIteration = 1;

  function rotateStep() {
    for (let i = 1; i <= 2946; i++) {
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }

    vp(0, 0, 1); // Ajustar la perspectiva de visualización (puedes personalizar los parámetros según tus necesidades)

    currentIteration++;

    if (currentIteration <= totalIterations) {
      setTimeout(rotateStep, 100); // Llamar a la función nuevamente después de 100ms
    }
  }

  rotateStep();
}

function calculateCenter(obj: any): Point3D {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (let i = 1; i <= 2946; i++) {
    sumX += obj.w[i].x;
    sumY += obj.w[i].y;
    sumZ += obj.w[i].z;
  }

  const numVertices = 2946; // Número total de vértices del objeto
  const centerX = sumX / numVertices;
  const centerY = sumY / numVertices;
  const centerZ = sumZ / numVertices;

  return new Point3D(centerX, centerY, centerZ);
}
/**/


function pza1DerFunc() {
  let af = 10;
 	
	Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);	
	
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}

function pza1IzqFunc() {
  let af = -10;
 	
	Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);	
	
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}
function pza12DerFunc() {
  let af = 10;
  Rota3D.initRotate(obj.w[29], obj.w[30], af * Math.PI / 180);
	
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}

function pza12IzqFunc() {
  let af = -10;
	Rota3D.initRotate( obj.w[29], obj.w[30], af*Math.PI/180);	
	
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  
	cv.setObj(obj);
  cv.paint();	
}
/*window.onload = () => {
  leerArchivo();
};*/


document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);


//movimiento de piezas
document.getElementById('pza1Izq').addEventListener('click', ()=>{rotateObjectY(obj, -20, 250)}, false);
document.getElementById('pza1Der').addEventListener('click', pza1DerFunc, false);
document.getElementById('pza12Izq').addEventListener('click', pza12IzqFunc, false);
document.getElementById('pza12Der').addEventListener('click', pza12DerFunc, false);

document.getElementById('pzatr').addEventListener('click', pza1TR, false);

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);