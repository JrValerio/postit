const express = require('express');
const { saveNote } = require('./db');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/note/:id', (req, res) => {
  res.sendFile(__dirname + '/public/note.html');
});

app.post('/note', async (req, res) => {
  const { content   } = req.body;
  if (!content) {
    return res.send('<span>Erro Inesperado</span>')
  }

  const id = crypto.randomUUID();
  await saveNote(id, content)
  res.send(
    `<div class="sticky-note">
        <div class="content">
            Nota compartilhada
        </div>
    </div>`
  )
});

app.get('/share/:id', async (req, res) => {
  const { id } = req.params;
  const note = await getNote(id);
  if (!note) {
    return res.send('<span>Erro Inesperado</span>')
  }
  res.send(
    `<div id="share-link">< /div>
        <p>Compartilhe sua nota através do link</p>
        <p>${note.content}</p>
        <br>
        <span>http://localhost:3000/note/${id}</span>
    </div>`
  )
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 

app.get('share/:id', async (req, res) => {
    await deleteExpiredNotes();
  const { id } = req.params;
  const note = await getNote(id);
  if (!note) {
    return res.send('<span class="error">Erro Inesperado</span>')
  }
  if(note.opened_at) {
    await markNoteAsOpened(id);
  }
  res.send(note.content)
  
  
});

