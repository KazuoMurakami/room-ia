# NLW Agents - Sistema de Perguntas e Respostas com IA

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)

## 📖 Sobre o Projeto

O **NLW Agents** é um sistema inteligente de perguntas e respostas desenvolvido durante um evento da **Rocketseat**. O projeto demonstra como construir uma aplicação completa que combina:

- 🎤 **Transcrição de áudio** usando IA
- 🔍 **Busca semântica** com embeddings vetoriais com text-embedding-004
- 🤖 **Respostas contextualizadas** geradas por IA
- 💬 **Interface moderna** para interação

### 🎯 Objetivo Educacional

Este projeto foi criado para ensinar conceitos avançados de desenvolvimento web e inteligência artificial:

1. **Arquitetura Full-Stack moderna** com TypeScript
2. **Integração com APIs de IA** (Google Gemini)
3. **Banco de dados vetorial** para busca semântica
4. **Processamento de áudio** e transcrição
5. **Real-time UI** com React Query

## 🏗️ Como Funciona

### 🔄 Fluxo Principal

### 🧠 Conceitos de IA Utilizados

#### 1. **Embeddings Vetoriais**

- Transformação de texto em vetores numéricos de 768 dimensões (text-embedding-004)
- Permite comparação semântica entre textos
- Usado para encontrar conteúdo relevante para responder perguntas

#### 2. **Busca por Similaridade**

- Utiliza distância coseno para encontrar conteúdo similar
- Threshold de 0.7 para garantir relevância
- Retorna os 3 chunks mais relevantes

#### 3. **RAG (Retrieval-Augmented Generation)**

- Combina busca (Retrieval) com geração (Generation)
- IA gera respostas baseadas apenas no contexto fornecido
- Evita alucinações ao limitar conhecimento ao conteúdo da aula

## 🚀 Tecnologias Utilizadas

### 🎨 Frontend (React)

| Tecnologia       | Versão | Propósito                        |
| ---------------- | ------ | -------------------------------- |
| **React**        | 19.1   | Biblioteca para interfaces       |
| **TypeScript**   | 5.8    | Tipagem estática                 |
| **Vite**         | 7.0    | Build tool e dev server          |
| **TailwindCSS**  | 4.1    | Framework CSS utility-first      |
| **React Router** | 7.6    | Roteamento SPA                   |
| **React Query**  | 5.8    | Gerenciamento de estado servidor |
| **Shadcn/ui**    | -      | Sistema de componentes           |
| **Radix UI**     | -      | Primitivos acessíveis            |

### ⚡ Backend (Node.js)

| Tecnologia        | Versão | Propósito                     |
| ----------------- | ------ | ----------------------------- |
| **Node.js**       | -      | Runtime JavaScript            |
| **TypeScript**    | 5.8    | Tipagem nativa (experimental) |
| **Fastify**       | 5.4    | Framework web performático    |
| **PostgreSQL**    | 17     | Banco de dados relacional     |
| **pgvector**      | -      | Extensão para vetores         |
| **Drizzle ORM**   | 0.44   | ORM type-safe                 |
| **Google Gemini** | 1.8    | API de IA                     |
| **Docker**        | -      | container para o banco        |
| **Zod**           | 3.25   | Validação de schemas          |

## 📁 Estrutura do Projeto

```
nlw-agent/
├── 📁 frontend-agent/          # Aplicação React
│   ├── 📁 src/
│   │   ├── 📁 components/      # Componentes reutilizáveis
│   │   ├── 📁 pages/          # Páginas da aplicação
│   │   ├── 📁 http/           # Hooks e tipos de API
│   │   └── 📁 lib/            # Utilitários
│   └── 📄 package.json
│
├── 📁 backend-agent/          # API Node.js
│   ├── 📁 src/
│   │   ├── 📁 db/             # Banco de dados
│   │   │   ├── 📁 schema/     # Schemas Drizzle
│   │   │   └── 📁 migrations/ # Migrações
│   │   ├── 📁 http/           # Rotas da API
│   │   └── 📁 services/       # Integrações externas
│   └── 📄 package.json
│
└── 📄 README.md              # Este arquivo
```

## 🛠️ Configuração e Execução

### 📋 Pré-requisitos

- **Node.js** (versão com suporte a `--experimental-strip-types`)
- **Docker** e **Docker Compose**
- **Conta Google** para API Gemini

### 🗄️ 1. Configurar Banco de Dados

```bash
# Subir PostgreSQL com pgvector
cd backend-agent
docker-compose up -d
```

### 🔑 2. Configurar Variáveis de Ambiente

**Backend (.env)**:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5431/agents
GEMINI_API_KEY=sua_chave_do_gemini_aqui
```

**Frontend (.env)**:

```env
VITE_API_URL=http://localhost:3333
```

### 📦 3. Instalar Dependências

```bash
# Backend
cd backend-agent
npm install

# Frontend
cd ../frontend-agent
npm install
```

### 🗃️ 4. Executar Migrações

```bash
cd backend-agent
npm run db:migrate
```

### ▶️ 5. Executar Aplicação

**Terminal 1 - Backend:**

```bash
cd backend-agent
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend-agent
npm run dev
```

### 🌐 6. Acessar Aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3333

## 🌐 Endpoints da API

### 🏠 **Salas**

```http
GET    /rooms                    # Lista todas as salas
POST   /rooms                    # Cria nova sala
GET    /rooms/:id/questions      # Lista perguntas de uma sala
```

### ❓ **Perguntas**

```http
POST   /rooms/:id/questions      # Cria pergunta e gera resposta
```

### 🎤 **Áudio**

```http
POST   /rooms/:id/audio          # Upload e transcrição de áudio
```

### 🔧 **Utilidades**

```http
GET    /health                   # Health check da API
```

#### **Exemplo de Requisição**

```bash
# Criar sala
curl -X POST http://localhost:3333/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aula de JavaScript",
    "description": "Conceitos fundamentais"
  }'

# Fazer pergunta
curl -X POST http://localhost:3333/rooms/ROOM_ID/questions \
  -H "Content-Type: application/json" \
  -d '{
    "question": "O que são closures em JavaScript?"
  }'
```

## 🎮 Como Usar

### 1️⃣ **Criar uma Sala**

- Acesse a aplicação
- Preencha nome e descrição da sala
- Clique em "Criar sala"

### 2️⃣ **Gravar Áudio**

- Entre na sala criada
- Clique em "Gravar Áudio"
- Permita acesso ao microfone
- Grave o conteúdo da aula/conversa
- O sistema automaticamente:
  - Transcreve o áudio
  - Gera embeddings
  - Salva no banco de dados

### 3️⃣ **Fazer Perguntas**

- Na página da sala, digite sua pergunta
- O sistema irá:
  - Gerar embedding da pergunta
  - Buscar conteúdo similar no banco
  - Gerar resposta contextualizada
  - Exibir a resposta

## 🏛️ Arquitetura Detalhada

### 🎨 Frontend

#### **Padrões Utilizados**

- **Component-based Architecture**: Componentes reutilizáveis
- **Custom Hooks**: Abstração de lógica de API
- **Path Aliasing**: Imports organizados com `@/`
- **Type Safety**: TypeScript estrito

#### **Gerenciamento de Estado**

- **React Query**: Cache e sincronização servidor
- **Optimistic Updates**: UI responsiva
- **Error Boundaries**: Tratamento de erros

### ⚡ Backend

#### **Padrões Utilizados**

- **Plugin Architecture**: Fastify com plugins modulares
- **Type-safe ORM**: Drizzle com inferência automática
- **Schema Validation**: Zod para validação runtime
- **Clean Architecture**: Separação de responsabilidades

#### **Banco de Dados**

```sql
-- Salas de aula
rooms (id, name, description, created_at)

-- Perguntas e respostas
questions (id, room_id, question, answer, created_at)

-- Chunks de áudio transcritos
audio_chunks (id, room_id, transcription, embeddings, created_at)
```

## 🧪 Conceitos Avançados Demonstrados

### 1. **Busca Vetorial**

```typescript
// Gerar embedding da pergunta
const embeddings = await generateEmbeddings(question);

// Buscar similaridade no banco
const chunks = await db
  .select({
    transcription: schema.audioChunks.transcription,
    similarity: sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
  })
  .where(sql`similarity > 0.7`)
  .orderBy(sql`similarity DESC`)
  .limit(3);
```

### 2. **Streaming de Áudio**

```typescript
// Processar áudio incrementalmente
const audioBuffer = await audio.toBuffer();
const audioAsBase64 = audioBuffer.toString("base64");
const transcription = await transcribeAudio(audioAsBase64, audio.mimetype);
```

### 3. **RAG Implementation**

```typescript
export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join("\n\n");

  const prompt = `
    Com base no contexto abaixo, responda a pergunta:
    
    CONTEXTO: ${context}
    PERGUNTA: ${question}
    
    Use apenas informações do contexto fornecido.
  `;

  return await gemini.generateContent({ prompt });
}
```

## 📚 Conceitos de Aprendizado

### 🤖 **Inteligência Artificial**

- **Embeddings**: Representação vetorial de texto
- **Similaridade Coseno**: Medida de proximidade semântica
- **RAG**: Geração aumentada por recuperação
- **Prompt Engineering**: Engenharia de prompts eficazes

### 🏗️ **Arquitetura de Software**

- **Microserviços**: Frontend e backend separados
- **API RESTful**: Endpoints bem definidos
- **Type Safety**: Tipagem em toda aplicação
- **Clean Code**: Código limpo e organizado

### 🗄️ **Banco de Dados**

- **Extensões PostgreSQL**: pgvector para vetores
- **Migrações**: Versionamento de schema
- **ORM**: Abstração type-safe de banco
- **Indexação**: Performance em buscas vetoriais

### 🎨 **Frontend Moderno**

- **React 19**: Hooks e componentes funcionais
- **State Management**: React Query para servidor
- **Build Tools**: Vite para desenvolvimento ágil
- **CSS-in-JS**: TailwindCSS utility-first

## 🚀 Próximos Passos

### 📈 **Melhorias Possíveis**

- [ ] **WebSocket**: Updates em tempo real
- [ ] **Autenticação**: Sistema de usuários
- [ ] **Múltiplos idiomas**: Suporte i18n
- [ ] **Upload de arquivos**: PDFs, documentos
- [ ] **Analytics**: Métricas de uso
- [ ] **Mobile**: App React Native

### 🔧 **Otimizações**

- [ ] **Cache Redis**: Cache de embeddings
- [ ] **CDN**: Servir assets estáticos
- [ ] **Compression**: Compressão de respostas
- [ ] **Rate Limiting**: Controle de taxa
- [ ] **Monitoring**: Logs e métricas

## 🔧 Troubleshooting

### ❌ **Problemas Comuns**

#### **Backend não inicia**

```bash
# Verificar se PostgreSQL está rodando
docker ps

# Verificar variáveis de ambiente
echo $DATABASE_URL
echo $GEMINI_API_KEY

# Executar migrações
npm run db:migrate
```

#### **Frontend não conecta com backend**

```bash
# Verificar URL da API
echo $VITE_API_URL

# Verificar se backend está rodando
curl http://localhost:3333/health
```

#### **Erro de CORS**

- Verificar se a origem do frontend está configurada no backend
- Padrão: `http://localhost:5173`

#### **Erro na API Gemini**

- Verificar se a chave está correta
- Verificar limites de rate da API
- Verificar conexão com internet

### 📋 **Logs Úteis**

```bash
# Backend logs
npm run dev

# Database logs
docker logs nlw-agents-pg

# Frontend logs
Console do navegador (F12)
```

## ❓ FAQ (Perguntas Frequentes)

### **Como obter chave da API Gemini?**

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova chave de API
3. Adicione no arquivo `.env` do backend

### **Por que usar embeddings?**

- Permitem busca semântica (por significado, não apenas palavras-chave)
- Funcionam melhor que busca textual tradicional
- Capturam contexto e relações entre conceitos

### **O que é pgvector?**

- Extensão PostgreSQL para armazenar e buscar vetores
- Suporta operações de similaridade eficientes
- Índices especializados para alta performance

### **Como funciona o RAG?**

1. **Retrieval**: Busca informações relevantes no banco
2. **Augmented**: Adiciona contexto ao prompt
3. **Generation**: IA gera resposta baseada no contexto

### **Posso usar outro modelo de IA?**

Sim! O código está preparado para trocar facilmente:

- OpenAI GPT
- Anthropic Claude
- Modelos locais (Ollama)

## 🤝 Contribuição

Este projeto é educacional e aceita contribuições! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais durante o evento NLW da Rocketseat.

## 🙋‍♂️ Suporte

Se tiver dúvidas sobre o projeto:

1. **Issues**: Abra uma issue no repositório
2. **Documentação**: Consulte os READMEs específicos
3. **Comunidade**: Participe da comunidade Rocketseat

---

### 💡 **Conceitos-chave aprendidos neste projeto:**

- **IA Generativa**: Uso prático de LLMs
- **Embeddings**: Busca semântica avançada
- **Full-Stack TypeScript**: Tipagem end-to-end
- **Modern Stack**: Tecnologias atuais do mercado
- **Real-world Application**: Projeto com valor prático

**Desenvolvido com ❤️ durante o NLW da [Rocketseat](https://rocketseat.com.br)**
