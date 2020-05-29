let allusuarios = null;
let allusuariosfilter = null;
let inputText = null;
let inputButton = null;
let tabUsuarios = null;
let tabEstatisticas = null;

window.addEventListener("load", () => {
  fetchUsuarios();
});

async function fetchUsuarios() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  allusuarios = json.results.map((usuario) => {
    const { name, picture, dob, gender } = usuario;
    return {
      name: name.first + " " + name.last,
      picture: picture.medium,
      age: dob.age,
      gender: gender,
    };
  });
  render();
}

function render() {
  inputText = document.getElementById("inputText");
  inputButton = document.getElementById("buttonBuscar");
  inputText.focus();

  tabUsuarios = document.getElementById("tabUsuarios");
  tabEstatisticas = document.getElementById("tabEstatisticas");

  inputText.addEventListener("keyup", eventFilterKey);
  inputButton.addEventListener("click", eventFilterClick);
}

function eventFilterKey(event) {
  if (event.key === "Enter") {
    if (event.target.value.length === 0) {
      allusuariosfilter = null;
      tabUsuarios.innerHTML = "<h5>Nenhum usuário filtrado</h5>";
      tabEstatisticas.innerHTML = " <h5>Nada a ser exibido</h5>";
      return allusuariosfilter;
    } else {
      allusuariosfilter = allusuarios.filter((usuario) => {
        return usuario.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      if (allusuariosfilter.length == 0) {
        allusuariosfilter = null;
        tabUsuarios.innerHTML = "<h5>Nenhum usuário filtrado</h5>";
        tabEstatisticas.innerHTML = " <h5>Nada a ser exibido</h5>";

        return allusuariosfilter;
      } else {
        createtabUsuarios(allusuariosfilter);
        createtabEstatisticas(allusuariosfilter);
      }
    }
  }
}

function eventFilterClick() {
  if (inputText.value.length === 0) {
    allusuariosfilter = null;
    tabUsuarios.innerHTML = "<h5>Nenhum usuário filtrado</h5>";
    tabEstatisticas.innerHTML = " <h5>Nada a ser exibido</h5>";
    return allusuariosfilter;
  } else {
    allusuariosfilter = allusuarios.filter((usuario) => {
      return usuario.name.toLowerCase().includes(inputText.value.toLowerCase());
    });
    if (allusuariosfilter.length == 0) {
      allusuariosfilter = null;
      tabUsuarios.innerHTML = "<h5>Nenhum usuário filtrado</h5>";
      tabEstatisticas.innerHTML = " <h5>Nada a ser exibido</h5>";
      return allusuariosfilter;
    } else {
      createtabUsuarios(allusuariosfilter);
      createtabEstatisticas(allusuariosfilter);
    }
  }
}

function createtabUsuarios(allusuariosfilter) {
  let QtUsuarios = allusuariosfilter.length;
  let usuariosHTML = `<div>
  <h5>${QtUsuarios} usuários(s) encontrados</h5>`;

  allusuariosfilter.forEach((usuario) => {
    const { picture, name, age } = usuario;
    const usuarioHTML = `
    <br><br/>
    <div class = 'person-flex'>
      <div>
        <img src='${picture}' >
      </div>
      <div>
        <span>${name}, ${age} anos</span>
      </div>
    </div>
    `;
    usuariosHTML += usuarioHTML;
  });
  usuariosHTML += "</div>";
  tabUsuarios.innerHTML = usuariosHTML;
}

function createtabEstatisticas(allusuariosfilter) {
  const countMasc = allusuariosfilter.filter((user) => {
    return user.gender === "male";
  });

  const countFemale = allusuariosfilter.filter((user) => {
    return user.gender === "female";
  });

  const totalAges = allusuariosfilter.reduce(
    (accumulator, current) => {
      return accumulator + current.age;
    },
    0 // valor inicial do accumulator
  );

  var mean_age = totalAges / (countMasc.length + countFemale.length);
  mean_age = Math.round(mean_age * 100) / 100;
  let statsHTML = `<div>
       <h5>Estatísticas</h5>
       <ul>
        <li>Sexo masculino: ${countMasc.length}</li>
        <li>Sexo feminino: ${countFemale.length}</li>
        <li>Soma das idades: ${totalAges}</li>
        <li>Média das idades: ${mean_age}</li>
        </ul>
    </div>
    `;
  tabEstatisticas.innerHTML = statsHTML;
}
