const express = require("express");
const {
  saveNote,
  getNote,
  markNoteAsOpened,
  deleteExpiredNotes,
} = require("./db");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/note/:id", (req, res) => {
  res.sendFile(__dirname + "/public/note.html");
});

app.post("/notes", async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.send("<span>Erro Inesperado!</span>");
  }

  try {
    const id = crypto.randomUUID();
    await saveNote(id, content);
    res.send(
      `
        <p>Aqui está o seu link para compartilhar:</p>
        <br>
        <span>${req.headers.origin || "http://localhost:3000"}/note/${id}</span>

    `
    );
  } catch (error) {
    console.error("Erro ao salvar a nota:", error);
    res.send('<span class="error">Erro Inesperado</span>');
  }
});

// Consolidada a rota `/share/:id` com as melhorias
app.get("/share/:id", async (req, res) => {
  await deleteExpiredNotes(); // Exclui notas expiradas

  const { id } = req.params;
  const note = await getNote(id);

  if (!note) {
    return res.send(
      '<span class="error">Erro: Esta mensagem não existe mais!</span>'
    );
  }

  if (!note.opened_at) {
    // Se a nota ainda não foi marcada como aberta, atualiza o campo `opened_at`
    await markNoteAsOpened(id);
  }

  res.send(note.content);
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes(); // Função que busca todas as notas
    res.json(notes); // Retorna as notas como JSON
  } catch (error) {
    console.error("Erro ao buscar as notas:", error);
    res.status(500).send("Erro ao buscar as notas");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
