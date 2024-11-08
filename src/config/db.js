import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./postit.db');

// Criação da tabela 'notes' com estrutura corrigida
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY, 
        content TEXT,
        opened_at DATE DEFAULT null,
        created_at DATE DEFAULT (datetime('now', 'localtime'))
    )`);
});

// Função para salvar uma nova nota
export const saveNote = (id, content) =>
  new Promise((resolve, reject) =>
    db.run(
      `INSERT INTO notes (id, content) VALUES (?, ?)`,
      [id, content],
      (err) => (err ? reject(err) : resolve())
    )
  );

// Função para buscar uma nota específica pelo ID
export const getNote = (id) =>
  new Promise((resolve, reject) =>
    db.get(`SELECT * FROM notes WHERE id = ?`, [id], (err, row) =>
      err ? reject(err) : resolve(row)
    )
  );

// Função para marcar uma nota como aberta, atualizando o campo `opened_at`
export const markNoteAsOpened = (id) =>
  new Promise((resolve, reject) =>
    db.run(
      `UPDATE notes SET opened_at = datetime('now', 'localtime') WHERE id = ?`,
      [id],
      (err) => (err ? reject(err) : resolve())
    )
  );

// Função para deletar notas expiradas
export const deleteExpiredNotes = () =>
  new Promise((resolve, reject) =>
    db.run(
      `DELETE FROM notes 
        WHERE opened_at < datetime('now', 'localtime', '-5 minutes')
        OR created_at IS NULL AND created_at < datetime('now', 'localtime', '-7 days')`,
      (err) => (err ? reject(err) : resolve())
    )
  );
