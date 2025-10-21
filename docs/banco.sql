CREATE TABLE IF NOT EXISTS professores (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    nome TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS turmas (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    professor_id INTEGER,
    FOREIGN KEY(professor_id) REFERENCES professores(id)
);

CREATE TABLE IF NOT EXISTS atividades (
    id INTEGER PRIMARY KEY,
    descricao TEXT NOT NULL,
    turma_id INTEGER,
    FOREIGN KEY(turma_id) REFERENCES turmas(id)
);

-
INSERT OR IGNORE INTO professores (email, senha, nome) VALUES ('prof_joao@gmail.com', 'senai123', 'João');
INSERT OR IGNORE INTO professores (email, senha, nome) VALUES ('prof_rebeca@gmail.com', 'senai112', 'Rebeca');
INSERT OR IGNORE INTO professores (email, senha, nome) VALUES ('prof_gabriel@gmail.com', 'senai122', 'Gabriel');

INSERT OR IGNORE INTO turmas (nome, professor_id) VALUES ('Turma 1A', 1);
INSERT OR IGNORE INTO turmas (nome, professor_id) VALUES ('Turma 1B', 1);
INSERT OR IGNORE INTO turmas (nome, professor_id) VALUES ('Turma 1C', 1);

INSERT OR IGNORE INTO atividades (descricao, turma_id) VALUES ('Atividade 1', 1);
INSERT OR IGNORE INTO atividades (descricao, turma_id) VALUES ('Atividade 2', 1);
INSERT OR IGNORE INTO atividades (descricao, turma_id) VALUES ('Atividade 3', 1);