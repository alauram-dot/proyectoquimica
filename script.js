body{
margin:0;
display:flex;
font-family:Segoe UI;
background:#0a0f0a;
color:white;
}

.sidebar{
width:250px;
height:100vh;
background:#1b2b1b;
padding:20px;
position:fixed;
}

.sidebar ul{
list-style:none;
padding:0;
}

.sidebar li{
padding:12px;
margin:10px 0;
background:#263826;
border-radius:8px;
cursor:pointer;
}

.main{
margin-left:270px;
padding:20px;
width:100%;
}

.stats{
display:flex;
gap:20px;
}

.card{
background:#1f3320;
padding:20px;
border-radius:12px;
width:180px;
}

#buscador{
width:100%;
padding:12px;
margin:20px 0;
font-size:16px;
border:none;
border-radius:8px;
}

#tabla{
display:grid;
grid-template-columns:
repeat(auto-fill,minmax(120px,1fr));
gap:15px;
}

.elemento{
background:#355735;
padding:15px;
border-radius:10px;
cursor:pointer;
transition:.3s;
}

.elemento:hover{
transform:scale(1.05);
background:#4b754b;
}
