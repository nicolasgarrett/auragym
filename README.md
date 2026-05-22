# Aura Performance Gym

Uma plataforma premium de bio-otimização e acompanhamento de performance de elite para membros da matilha AuraGym.

## 🚀 Tecnologias
- **Frontend**: React 19 + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + Groq SDK (Lúpus AI)
- **Database**: Sistema de persistência local em JSON para Base de Conhecimento e Prompts
- **Linguagem**: TypeScript

## 🐺 Lúpus AI
O Lúpus é a nossa inteligência artificial de performance, treinada com dados científicos e protocolos de treino da AuraGym. Ele processa consultas em tempo real para guiar atletas em sua jornada de evolução genética.

## ⚙️ Configuração
Para o funcionamento pleno da IA Lúpus, é necessário configurar as seguintes variáveis de ambiente no AI Studio (Settings -> Secrets):
- `GROQ_API_KEY`: Chave de API do Groq para processamento de linguagem natural.

## 🔑 Ativação do Sistema de Autenticação
Para que o cadastro de novos alunos funcione, é obrigatório:
1. Ir ao [Console do Firebase](https://console.firebase.google.com/).
2. Navegar para **Authentication** > **Sign-in method**.
3. Ativar o provedor de **E-mail/Senha**.

*Nota: Os administradores Nicolas e Abner possuem um bypass de acesso configurado com a senha `Aura2026`.*
- `npm run dev`: Inicia o servidor de desenvolvimento (Express + Vite)
- `npm run build`: Gera o bundle de produção
- `npm run lint`: Verifica erros de tipagem com TypeScript
