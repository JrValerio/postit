const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./postit.db");

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
const saveNote = (id, content) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO notes (id, content) VALUES (?, ?)`,
      [id, content],
      (err) => {
        if (err) {
            console.error("Erro ao salvar nota:", err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

// Função para buscar uma nota específica pelo ID
const getNote = (id) =>
  new Promise((resolve, reject) => {
    db.get(`SELECT * FROM notes WHERE id = ?`, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

// Função para buscar todas as notas
const getNotes = () =>
  new Promise((resolve, reject) => {
    db.all(`SELECT * FROM notes`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

// Função para marcar uma nota como aberta, atualizando o campo `opened_at`
const markNoteAsOpened = (id) =>
  new Promise((resolve, reject) => {
    db.run(
      `UPDATE notes SET opened_at = datetime('now', 'localtime') WHERE id = ?`,
      [id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

// Função para deletar notas expiradas
const deleteExpiredNotes = () =>
  new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM notes 
        WHERE opened_at < datetime('now', '-5 minutes')
        OR created_at IS NULL 
        OR created_at < datetime('now', '-7 days')`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

// Função para deletar uma nota específica pelo ID
const deleteNote = (id) =>
  new Promise((resolve, reject) => {
    db.run(`DELETE FROM notes WHERE id = ?`, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

module.exports = {
  saveNote,
  getNote,
  getNotes,
  markNoteAsOpened,
  deleteExpiredNotes,
  deleteNote,
};
