const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Configuração de middlewares
app.use(bodyParser.json());
app.use(session({ secret: 'seu-segredo', resave: false, saveUninitialized: true }));

// Middleware para permitir CORS (necessário para front-end estático)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const professor = await prisma.professor.findUnique({
            where: { email, senha },
        });
        if (professor) {
            req.session.user = professor;
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

// Rota para verificar sessão
app.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.sendStatus(401);
    }
});

// Rota de logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

// Rota para listar turmas do professor
app.get('/turmas', async (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    try {
        const turmas = await prisma.turma.findMany({
            where: { professorId: req.session.user.id },
        });
        res.json(turmas);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Rota para obter uma turma específica
app.get('/turmas/:id', async (req, res) => {
    try {
        const turma = await prisma.turma.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (turma) res.json(turma);
        else res.sendStatus(404);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Rota para cadastrar uma nova turma
app.post('/turmas', async (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const { nome } = req.body;
    try {
        await prisma.turma.create({
            data: {
                nome,
                professorId: req.session.user.id,
            },
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Rota para excluir uma turma
app.delete('/turmas/:id', async (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    try {
        const atividades = await prisma.atividade.findMany({
            where: { turmaId: parseInt(req.params.id) },
        });
        if (atividades.length > 0) {
            return res.status(400).json({ message: 'Você não pode excluir uma turma com atividades cadastradas' });
        }
        await prisma.turma.delete({
            where: { id: parseInt(req.params.id), professorId: req.session.user.id },
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Rota para listar atividades de uma turma
app.get('/atividades', async (req, res) => {
    const turma_id = parseInt(req.query.turma_id);
    try {
        const atividades = await prisma.atividade.findMany({
            where: { turmaId: turma_id },
        });
        res.json(atividades);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Rota para cadastrar uma nova atividade
app.post('/atividades', async (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const { descricao, turma_id } = req.body;
    try {
        await prisma.atividade.create({
            data: {
                descricao,
                turmaId: parseInt(turma_id),
            },
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Iniciar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Limpar conexão com o Prisma ao encerrar
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});