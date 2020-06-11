import express from "express";
import { promises } from "fs";

const readFile = promises.readFile;
const writeFile = promises.writeFile;
const router = express.Router();

router.post("/", async (req, res) => {
  let New = req.body;
  try {
    var OldGrade = await readFile("grades.json");
    var OldGrade = JSON.parse(OldGrade);

    New = { id: OldGrade.nextId, ...New, timestamp: new Date() };
    let NewGrade = { nextId: OldGrade.nextId + 1, grades: OldGrade.grades };
    NewGrade.grades.push(New);

    await writeFile("grades.json", JSON.stringify(NewGrade));
    res.send(NewGrade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    let change = req.body;
    var OldGrade = await readFile("grades.json");
    var OldGrade = JSON.parse(OldGrade);

    let index = OldGrade.grades.findIndex((old) => {
      return old.id === change.id;
    });

    if (index === -1) {
      throw new Error("Not Id");
    }

    OldGrade.grades[index].student = change.student;
    OldGrade.grades[index].subject = change.subject;
    OldGrade.grades[index].type = change.type;
    OldGrade.grades[index].value = change.value;

    await writeFile("grades.json", JSON.stringify(OldGrade));

    res.send(OldGrade.grades[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    let delet = req.body;

    var OldGrade = await readFile("grades.json");
    var OldGrade = JSON.parse(OldGrade);

    let index = OldGrade.grades.findIndex((nota) => {
      return nota.id === delet.id;
    });

    if (index === -1) {
      throw new Error("Not Id");
    }

    let NewGrade = OldGrade.grades.filter((nota) => {
      return nota.id !== delet.id;
    });
    OldGrade.grades = NewGrade;

    await writeFile("grades.json", JSON.stringify(OldGrade));
    res.send(OldGrade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let view = req.body;

    var Grade = await readFile("grades.json");
    var Grade = JSON.parse(Grade);

    let index = Grade.grades.findIndex((nota) => {
      return nota.id === view.id;
    });

    if (index === -1) {
      throw new Error("Not Id");
    }

    res.send(
      Grade.grades.filter((nota) => {
        return nota.id === view.id;
      })
    );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/sum", async (req, res) => {
  try {
    let view = req.body;

    var Grade = await readFile("grades.json");
    var Grade = JSON.parse(Grade);

    let stud_subj = Grade.grades.filter((nota) => {
      return nota.student === view.student && nota.subject == view.subject;
    });

    if (stud_subj.length === 0) {
      throw new Error("Not student or subject");
    }

    let sum_value = stud_subj.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    res.send(String(sum_value));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/mean", async (req, res) => {
  try {
    let view = req.body;

    var Grade = await readFile("grades.json");
    var Grade = JSON.parse(Grade);

    let subj_type = Grade.grades.filter((nota) => {
      return nota.type === view.type && nota.subject == view.subject;
    });

    if (subj_type.length === 0) {
      throw new Error("Not subject or type");
    }

    let subj_type_sum = subj_type.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    let mean = subj_type_sum / subj_type.length;
    res.send(String(mean));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/best", async (req, res) => {
  try {
    let view = req.body;

    var Grade = await readFile("grades.json");
    var Grade = JSON.parse(Grade);

    let subj_type = Grade.grades.filter((nota) => {
      return nota.type === view.type && nota.subject == view.subject;
    });

    if (subj_type.length === 0) {
      throw new Error("Not subject or type");
    }

    let ordenado = subj_type.sort((a, b) => {
      return b.value - a.value;
    });

    res.send(ordenado);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
