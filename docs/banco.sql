-- Criação das tabelas
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

-- Inserção de dados de teste
-- Professores
INSERT OR IGNORE INTO professores (email, senha, nome) VALUES ('prof1@example.com', 'senha1', 'Prof A');
INSERT OR IGNORE INTO professores (email, senha, nome) VALUES ('prof2@example.com', 'senha2', 'Prof B');
INSERT OR IGNORE INTO professores (email, senha, nome) VALUES ('prof3@example.com', 'senha3', 'Prof C');

-- Turmas (associadas ao professor com id=1)
INSERT OR IGNORE INTO turmas (nome, professor_id) VALUES ('Turma 1A', 1);
INSERT OR IGNORE INTO turmas (nome, professor_id) VALUES ('Turma 1B', 1);
INSERT OR IGNORE INTO turmas (nome, professor_id) VALUES ('Turma 1C', 1);

-- Atividades (associadas à turma com id=1)
INSERT OR IGNORE INTO atividades (descricao, turma_id) VALUES ('Atividade 1', 1);
INSERT OR IGNORE INTO atividades (descricao, turma_id) VALUES ('Atividade 2', 1);
INSERT OR IGNORE INTO atividades (descricao, turma_id) VALUES ('Atividade 3', 1);