import express from 'express';
import crypto from 'crypto';
import {
  saveNote,
  getNote,
  markNoteAsOpened,
  deleteExpiredNotes,
} from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.get('/note/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/note.html'));
});

app.post('/notes', async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.send('<span>Erro Inesperado!</span>');
  }

  try {
    const id = crypto.randomUUID();
    await saveNote(id, content);
    res.send(`
      <div class="share-container">
        <p class="share-text">Aqui está o seu link para compartilhar:</p>
        <div class="link-container">
          <span id="note-link" class="note-link">
            ${req.headers.origin || 'http://localhost:3000'}/note/${id}
          </span>
          <button id="copy-button" class="copy-button" onclick="copyLink()">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>

      <script>
        function copyLink() {
          const linkElement = document.getElementById("note-link");
          if (linkElement) {
            const link = linkElement.textContent;
            navigator.clipboard.writeText(link).then(() => {
              const copyButton = document.getElementById("copy-button");
              copyButton.innerHTML = "<i class='fas fa-check' style='color: green;'></i>";
              setTimeout(() => {
                copyButton.innerHTML = "<i class='fas fa-copy'></i>";
              }, 2000);
            }).catch(err => {
              console.error("Erro ao copiar o link:", err);
            });
          } else {
            console.error("Elemento com ID 'note-link' não encontrado.");
          }
        }
      </script>
    `);
  } catch (error) {
    console.error('Erro ao salvar a nota:', error);
    res.send('<span class="error">Erro Inesperado</span>');
  }
});

app.get('/share/:id', async (req, res) => {
  await deleteExpiredNotes();

  const { id } = req.params;
  const note = await getNote(id);

  if (!note) {
    return res.send(
      '<span class="error">Erro: Esta mensagem não existe mais!</span>'
    );
  }

  if (!note.opened_at) {
    await markNoteAsOpened(id);
  }

  res.send(note.content);
});

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
