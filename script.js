const elementos = [
{simbolo:"H",nombre:"Hidrógeno"},
{simbolo:"He",nombre:"Helio"},
{simbolo:"Li",nombre:"Litio"},
{simbolo:"C",nombre:"Carbono"},
{simbolo:"N",nombre:"Nitrógeno"},
{simbolo:"O",nombre:"Oxígeno"},
{simbolo:"Na",nombre:"Sodio"},
{simbolo:"Cl",nombre:"Cloro"},
{simbolo:"Fe",nombre:"Hierro"},
{simbolo:"Au",nombre:"Oro"}
];

const contenedor = document.getElementById("elementos");

function mostrarElementos(lista){
contenedor.innerHTML = "";

lista.forEach(e=>{
const card=document.createElement("div");
card.className="card";
card.innerHTML=`
<h3>${e.simbolo}</h3>
<p>${e.nombre}</p>
`;
contenedor.appendChild(card);
});
}

mostrarElementos(elementos);

document.getElementById("buscador")
.addEventListener("input",e=>{
const texto=e.target.value.toLowerCase();

const filtrados=elementos.filter(el=>
el.nombre.toLowerCase().includes(texto) ||
el.simbolo.toLowerCase().includes(texto)
);

mostrarElementos(filtrados);
});

const preguntas = [
{
pregunta:"¿Cuál es el símbolo del Oxígeno?",
opciones:["Ox","O","Og"],
correcta:"O"
},
{
pregunta:"¿Cuál es el elemento Au?",
opciones:["Plata","Oro","Hierro"],
correcta:"Oro"
}
];

let actual=0;

function cargarPregunta(){
document.getElementById("pregunta").innerText =
preguntas[actual].pregunta;

const opciones =
document.getElementById("opciones");

opciones.innerHTML="";

preguntas[actual].opciones.forEach(op=>{

const btn=document.createElement("button");
btn.innerText=op;

btn.onclick=()=>{

document.getElementById("resultado").innerText =
op===preguntas[actual].correcta ?
"✅ Correcto" :
"❌ Incorrecto";

actual++;

if(actual<preguntas.length){
setTimeout(cargarPregunta,1000);
}
};

opciones.appendChild(btn);
});
}

cargarPregunta();
