# Escola Avaliação

## Requisitos de Infraestrutura
- SGBD: SQLite versão 3.x (arquivo local `turmas_db.db`).
- Servidor de Aplicação: Node.js versão 18+ no sistema operacional Windows, Linux ou macOS.
- Linguagem: JavaScript com Node.js versão 18+.

## Tutorial para Testar o Aplicativo

Para configurar e testar a aplicação, siga os passos abaixo:

### 1. Clonar o Repositório (se aplicável)
Se você recebeu o projeto via um repositório Git, clone-o para sua máquina local:
```bash
git clone https://github.com/seuusuario/escolaavaliacao.git
cd escolaavaliacao
```
Se você recebeu o projeto como um arquivo ZIP, descompacte-o e navegue até a pasta `avaliacao-escola`.

### 2. Configurar o Backend (API)
Navegue até o diretório `api` dentro da pasta do projeto:
```bash
cd avaliacao-escola/api
```

Instale as dependências do Node.js:
```bash
npm install
```

Após a instalação das dependências, gere o Prisma Client:
```bash
npx prisma generate
```

**Importante**: Para garantir que o banco de dados seja criado corretamente e populado com os dados de teste, remova qualquer arquivo `turmas_db.db` existente e as migrações anteriores, e então execute as novas migrações:
```bash
rm -f turmas_db.db
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

Popule o banco de dados com dados de teste:
```bash
node seed.js
```

Inicie o servidor backend:
```bash
node app.js
```
O servidor estará rodando na porta `3000`.

### 3. Acessar o Frontend (Interface Web)
Com o servidor backend rodando, abra seu navegador e acesse a seguinte URL:
```
http://localhost:3000
```

**Observação Importante**: Não tente abrir o arquivo `index.html` diretamente do seu sistema de arquivos (ex: `file:///caminho/para/index.html`). A aplicação frontend se comunica com o backend via requisições HTTP, e o navegador impõe restrições de segurança (política de mesma origem - CORS) que impedem essa comunicação quando o frontend é carregado como um arquivo local. O servidor backend já está configurado para servir os arquivos estáticos do frontend, garantindo que tudo funcione corretamente ao acessar `http://localhost:3000`.

### 4. Credenciais de Teste
Utilize as seguintes credenciais para fazer login na aplicação:
- **E-mail**: `prof1@example.com`
- **Senha**: `senha1`

### 5. Funcionalidades para Testar
Após o login, você poderá testar as seguintes funcionalidades:
- Visualizar o nome do professor logado.
- Cadastrar novas turmas.
- Visualizar a lista de turmas cadastradas.
- Visualizar as atividades de uma turma específica.
- Cadastrar novas atividades para uma turma.
- Excluir atividades de uma turma.
- Excluir turmas (com validação para turmas que possuem atividades).
- Realizar logout do sistema.