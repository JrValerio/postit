const express = require("express");
const crypto = require("crypto");
const {
  saveNote,
  getNote,
  deleteExpiredNotes,
  markNoteAsOpened,
} = require("./db");
const app = express();
const port = 3000;

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
        <span>${req.headers.origin || 'http://localhost:3000'}/note/${id}</span>

    </div>`
    );
  } catch (error) {
    res.send('<span class="error">Erro Inesperado</span>');
  }
});

// Consolidada a rota `/share/:id` com as melhorias
app.get("/share/:id", async (req, res) => {
  await deleteExpiredNotes(); // Exclui notas expiradas

  const { id } = req.params;
  const note = await getNote(id);

  if (!note) {
    return res.send('<span class="error">Erro: Nota não encontrada</span>');
  }

  if (note.opened_at === null) {
    // Se a nota ainda não foi marcada como aberta, atualiza o campo `opened_at`
    await markNoteAsOpened(id);
  }

  res.send(`
    <div id="share-link">
        <p>Aqui está o seu link para compartilhar:</p>
        <p>${note.content}</p>
        <br>
        <span>http://localhost:3000/note/${id}</span>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

