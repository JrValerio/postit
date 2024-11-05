const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./postit.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY, 
        content TEXT)
        opened_at DATE DEFAULT null,
        created_at DATE DEFAULT (datetime('now', 'localtime'))
        `);
});

const saveNote = (id, content) => new Promise((resolve, reject) => {
    db.run(`INSERT INTO notes (id, content) VALUES (?, ?)`, [id, content], (err) => {
    if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});
const getNote = (id) => new Promise((resolve, reject) => {
    db.get(`SELECT * FROM notes WHERE id = ?`, [id], (err, row) => {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
    });
});
const getNotes = () => new Promise((resolve, reject) => {
    db.all(`SELECT * FROM notes WHERE id = ?`, [id], (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    });
});

const markNoteAsOpened = (id) => new Promise((resolve, reject) => {
    db.run(`UPDATE notes SET opened_at = datetime('now', 'localtime') WHERE id = ?`, [id], (err) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
})

const deleteExpiredNotes = () => new Promise((resolve, reject) => {
    db.run(`DELETE FROM notes 
        WHERE opened_at < datetime('now', '-5 minutes')
        OR created_at IS NULL OR created_at < datetime('now', '-7days')`, (err) => {
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
    deleteNote
};