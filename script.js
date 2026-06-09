const tabla =
document.getElementById("tabla");

function mostrar(lista){

tabla.innerHTML="";

lista.forEach(el=>{

const div =
document.createElement("div");

div.className="elemento";

div.innerHTML=`
<h3>${el.simbolo}</h3>
<p>${el.nombre}</p>
<small>#${el.numero}</small>
`;

tabla.appendChild(div);

});

}

mostrar(elementos);

document
.getElementById("buscador")
.addEventListener("input",e=>{

const texto =
e.target.value.toLowerCase();

const filtrado =
elementos.filter(el=>

el.nombre.toLowerCase().includes(texto)
||
el.simbolo.toLowerCase().includes(texto)

);

mostrar(filtrado);

});
