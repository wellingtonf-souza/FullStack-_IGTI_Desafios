var express = require("express");
var app = express();
var port = 8000;

var fs = require("fs");

app.use(express.json());

app.get("/WriteCitiesByState", async (req, res) => {
  const cities = await Cities();
  const states = await States();
  states.forEach((state) => {
    const cities_state = cities.filter((citie) => {
      return citie.Estado === state.ID;
    });
    fs.promises.writeFile(
      "./output/" + state.Sigla + ".json",
      JSON.stringify(cities_state)
    );
  });
  res.send("Cities by state");
});

app.get("/NumberOfCities", async (req, res) => {
  // formato da requisicao: { Sigla: 'MG' }
  UF = req.body.Sigla;
  const citiesUF = await StateUF(UF);
  res.send(String(citiesUF.length));
});

app.get("/MoreCities", async (req, res) => {
  const resultado = [];
  const states = await States();
  const ufs = states.map((state) => {
    return { UF: state.Sigla };
  });
  ufs.forEach(async (uf) => {
    const citiesUF = await StateUF(uf.UF);
    resultado.push({ UF: uf.UF, Cities: citiesUF.length });
    if (resultado.length === 27) {
      resultado.sort((a, b) => {
        return b.Cities - a.Cities;
      });
      res.send(resultado.slice(0, 5));
    }
  });
});

app.get("/LessCities", async (req, res) => {
  const resultado = [];
  const states = await States();
  const ufs = states.map((state) => {
    return { UF: state.Sigla };
  });
  ufs.forEach(async (uf) => {
    const citiesUF = await StateUF(uf.UF);
    resultado.push({ UF: uf.UF, Cities: citiesUF.length });
    if (resultado.length === 27) {
      resultado.sort((a, b) => {
        return a.Cities - b.Cities;
      });
      res.send(resultado.slice(0, 5));
    }
  });
});

app.get("/BigLengthCitie", async (req, res) => {
  const resultado = [];
  const states = await States();
  const ufs = states.map((state) => {
    return { UF: state.Sigla };
  });
  ufs.forEach(async (uf) => {
    const CitiesState = await StateUF(uf.UF);
    CitiesState.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });
    const Biglength = CitiesState[0].Nome.length;
    const BigCities = CitiesState.filter((citie) => {
      return citie.Nome.length === Biglength;
    });
    if (BigCities.length === 1) {
      const BigCitie = CitiesState.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: BigCitie[0].Nome });
      if (resultado.length === 27) {
        res.send(resultado);
      }
    } else {
      BigCities.sort((a, b) => {
        return a.Nome.localeCompare(b.Nome);
      });
      const BigCitie = BigCities.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: BigCitie[0].Nome });
      if (resultado.length === 27) {
        res.send(resultado);
      }
    }
  });
});

app.get("/SmallLengthCitie", async (req, res) => {
  const resultado = [];
  const states = await States();
  const ufs = states.map((state) => {
    return { UF: state.Sigla };
  });
  ufs.forEach(async (uf) => {
    const CitiesState = await StateUF(uf.UF);
    CitiesState.sort((a, b) => {
      return a.Nome.length - b.Nome.length;
    });
    const smalllength = CitiesState[0].Nome.length;
    const smallCities = CitiesState.filter((citie) => {
      return citie.Nome.length === smalllength;
    });
    if (smallCities.length === 1) {
      const SmallCitie = CitiesState.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: SmallCitie[0].Nome });
      if (resultado.length === 27) {
        res.send(resultado);
      }
    } else {
      smallCities.sort((a, b) => {
        return a.Nome.localeCompare(b.Nome);
      });
      const SmallCitie = smallCities.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: SmallCitie[0].Nome });
      if (resultado.length === 27) {
        res.send(resultado);
      }
    }
  });
});

app.get("/BigLengthCitieBR", async (req, res) => {
  const resultado = [];
  const states = await States();
  const ufs = states.map((state) => {
    return { UF: state.Sigla };
  });
  ufs.forEach(async (uf) => {
    const CitiesState = await StateUF(uf.UF);
    CitiesState.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });
    const Biglength = CitiesState[0].Nome.length;
    const BigCities = CitiesState.filter((citie) => {
      return citie.Nome.length === Biglength;
    });
    if (BigCities.length === 1) {
      const BigCitie = CitiesState.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: BigCitie[0].Nome });
      if (resultado.length === 27) {
        resultado.sort((a, b) => {
          return b.Citie.length - a.Citie.length;
        });
        const BigBR = resultado[0].Citie.length;
        const BigsBR = resultado.filter((citie) => {
          return citie.Citie.length === BigBR;
        });
        if (BigsBR.length === 1) {
          res.send(BigsBR);
        } else {
          BigsBR.sort((a, b) => {
            return a.Citie.localeCompare(b.Citie);
          });
          res.send(BigsBR[0]);
        }
      }
    } else {
      BigCities.sort((a, b) => {
        return a.Nome.localeCompare(b.Nome);
      });
      const BigCitie = BigCities.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: BigCitie[0].Nome });
      if (resultado.length === 27) {
        resultado.sort((a, b) => {
          return b.Citie.length - a.Citie.length;
        });
        const BigBR = resultado[0].Citie.length;
        const BigsBR = resultado.filter((citie) => {
          return citie.Citie.length === BigBR;
        });
        if (BigsBR.length === 1) {
          res.send(BigsBR);
        } else {
          BigsBR.sort((a, b) => {
            return a.Citie.localeCompare(b.Citie);
          });
          res.send(BigsBR[0]);
        }
      }
    }
  });
});

app.get("/SmallLengthCitieBR", async (req, res) => {
  const resultado = [];
  const states = await States();
  const ufs = states.map((state) => {
    return { UF: state.Sigla };
  });
  ufs.forEach(async (uf) => {
    const CitiesState = await StateUF(uf.UF);
    CitiesState.sort((a, b) => {
      return a.Nome.length - b.Nome.length;
    });
    const smallLength = CitiesState[0].Nome.length;
    const smallCities = CitiesState.filter((citie) => {
      return citie.Nome.length === smallLength;
    });
    if (smallCities.length === 1) {
      const smallCitie = CitiesState.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: smallCitie[0].Nome });
      if (resultado.length === 27) {
        resultado.sort((a, b) => {
          return a.Citie.length - b.Citie.length;
        });
        const smallBR = resultado[0].Citie.length;
        const smallsBR = resultado.filter((citie) => {
          return citie.Citie.length === smallBR;
        });
        if (smallsBR.length === 1) {
          res.send(smallsBR);
        } else {
          smallsBR.sort((a, b) => {
            return a.Citie.localeCompare(b.Citie);
          });
          res.send(smallsBR[0]);
        }
      }
    } else {
      smallCities.sort((a, b) => {
        return a.Nome.localeCompare(b.Nome);
      });
      const smallCitie = smallCities.slice(0, 1);
      resultado.push({ UF: uf.UF, Citie: smallCitie[0].Nome });
      if (resultado.length === 27) {
        resultado.sort((a, b) => {
          return a.Citie.length - b.Citie.length;
        });
        const smallBR = resultado[0].Citie.length;
        const smallsBR = resultado.filter((citie) => {
          return citie.Citie.length === smallBR;
        });
        if (smallsBR.length === 1) {
          res.send(smallsBR);
        } else {
          smallsBR.sort((a, b) => {
            return a.Citie.localeCompare(b.Citie);
          });
          res.send(smallsBR[0]);
        }
      }
    }
  });
});

async function Cities() {
  const cities = await fs.promises.readFile("./data/Cidades.json");
  const dataCities = await JSON.parse(cities);
  return dataCities;
}

async function States() {
  const states = await fs.promises.readFile("./data/Estados.json");
  const dataStates = await JSON.parse(states);
  return dataStates;
}

async function StateUF(UF) {
  const state = await fs.promises.readFile("./output/" + UF + ".json");
  const dataState = await JSON.parse(state);
  return dataState;
}

app.listen(port, () => {
  console.log("API started");
});
