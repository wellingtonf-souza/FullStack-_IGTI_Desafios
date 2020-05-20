window.addEventListener("load", start);

function colorido(R, G, B) {
  //quad = document.querySelector("#quadrado_colorido");
  quad = document.querySelector("body");
  quad.style.backgroundColor = "rgb(" + R + "," + G + "," + B + ")";
}

function mostrar_texto(R, G, B) {
  text_R = document.querySelector("#text_R");
  text_R.value = R;
  text_G = document.querySelector("#text_G");
  text_G.value = G;
  text_B = document.querySelector("#text_B");
  text_B.value = B;
  colorido(R, G, B);
}

function start() {
  console.log("load");
  R = document.querySelector("#R");
  G = document.querySelector("#G");
  B = document.querySelector("#B");
  mostrar_texto(R.value, G.value, B.value);
  colorido(R.value, G.value, B.value);
  var form = document.querySelector("form");
  form.addEventListener("keyup", start);
  form.addEventListener("click", start);
  form.addEventListener("keydown", start);
}
