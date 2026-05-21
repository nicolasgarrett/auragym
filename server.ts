import express, { Request } from "express";
import path from "path";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import multer from "multer";
// @ts-ignore
import * as _pdf from 'pdf-parse';
const pdf = (_pdf as any)?.default || _pdf;

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Setup knowledge base file
const KNOWLEDGE_FILE = path.join(process.cwd(), "knowledge.json");
const PROMPT_FILE = path.join(process.cwd(), "prompts", "system_instruction.txt");

// Cache for optimized performance
let cachedKnowledge: any[] | null = null;
let cachedPrompt: string | null = null;

async function ensureKnowledgeFile() {
  try {
    await fs.access(KNOWLEDGE_FILE);
  } catch {
    await fs.writeFile(KNOWLEDGE_FILE, JSON.stringify([]));
    cachedKnowledge = [];
  }
}

async function getCachedKnowledge() {
  if (cachedKnowledge === null) {
    try {
      await ensureKnowledgeFile();
      const data = await fs.readFile(KNOWLEDGE_FILE, "utf-8");
      cachedKnowledge = JSON.parse(data);
    } catch (e) {
      console.error("Cache Knowledge Load Error:", e);
      cachedKnowledge = [];
    }
  }
  return cachedKnowledge;
}

async function getCachedPrompt() {
  if (cachedPrompt === null) {
    try {
      await ensurePromptFile();
      cachedPrompt = await fs.readFile(PROMPT_FILE, "utf-8");
    } catch (e) {
      console.error("Cache Prompt Load Error:", e);
      cachedPrompt = "Você é o LÚPUS, o Lobo Alfa Cibernético oficial da AuraGym.";
    }
  }
  return cachedPrompt;
}

function invalidateCaches() {
  cachedKnowledge = null;
  cachedPrompt = null;
}

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Groq client lazily
let groqClient: Groq | null = null;
function getGroq(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("ERRO CRÍTICO: GROQ_API_KEY não configurada nos Segredos (Secrets).");
      throw new Error("GROQ_API_KEY is required for Lúpus AI to function.");
    }
    
    groqClient = new Groq({
      apiKey: apiKey,
      timeout: 5000, // 5-second timeout
    });
  }
  return groqClient;
}

async function ensurePromptFile() {
  try {
    await fs.mkdir(path.dirname(PROMPT_FILE), { recursive: true });
    await fs.access(PROMPT_FILE);
  } catch {
    await fs.writeFile(PROMPT_FILE, "Você é o LÚPUS, o Lobo Alfa Cibernético oficial da AuraGym.");
  }
}

const ADMIN_EMAILS = [
  'nicolasgarrett110@gmail.com',
  'admin@auragym.com.br',
  'abner.s.s.machado@gmail.com',
];

const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adminEmail = req.headers['x-admin-email'];
  if (typeof adminEmail === 'string' && ADMIN_EMAILS.includes(adminEmail)) {
    next();
  } else {
    res.status(403).json({ error: "Acesso negado. Apenas administradores autorizados." });
  }
};

// Admin Knowledge API
app.get("/api/admin/prompt", checkAdmin, async (req, res) => {
  try {
    const content = await getCachedPrompt();
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Failed to read prompt" });
  }
});

app.post("/api/admin/prompt", checkAdmin, async (req, res) => {
  const { content } = req.body;
  if (typeof content !== "string") return res.status(400).json({ error: "Content required" });
  try {
    await ensurePromptFile();
    await fs.writeFile(PROMPT_FILE, content);
    cachedPrompt = content; // Update cache
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save prompt" });
  }
});

app.get("/api/admin/knowledge", checkAdmin, async (req, res) => {
  try {
    const data = await getCachedKnowledge();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read knowledge base" });
  }
});

app.post("/api/admin/knowledge/text", checkAdmin, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title and content required" });

  try {
    const data = await getCachedKnowledge() || [];
    const newItem = { id: Date.now().toString(), title, content, type: "text", createdAt: new Date() };
    data.push(newItem);
    await fs.writeFile(KNOWLEDGE_FILE, JSON.stringify(data, null, 2));
    cachedKnowledge = data; // Update cache
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to save text knowledge" });
  }
});

app.post("/api/admin/knowledge/file", checkAdmin, upload.single("file"), async (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: "File required" });

  try {
    let content = "";
    if (req.file.mimetype === "application/pdf") {
      try {
        if (typeof pdf === "function") {
          const data = await pdf(req.file.buffer);
          content = data.text;
        } else if (pdf && typeof pdf.PDFParse === "function") {
          const instance = new pdf.PDFParse({ data: req.file.buffer });
          const result = await instance.getText();
          content = result.text || "";
        } else {
          content = `[Conteúdo do arquivo PDF: ${req.file.originalname}]`;
        }
      } catch (pdfErr) {
        console.error("PDF Parsing error, fell back:", pdfErr);
        content = `[Arquivo PDF: ${req.file.originalname} - Processado com base em metadados]`;
      }
    } else if (req.file.mimetype.startsWith("image/")) {
      // Mock OCR for images for now
      content = `[Image Content Mocked from ${req.file.originalname}] Atleta detectado em alta performance na unidade AuraGym Paulista. Treino de bio-otimização em progresso.`;
    } else {
      content = req.file.buffer.toString("utf-8");
    }

    const knowledgeData = await getCachedKnowledge() || [];
    const newItem = { 
      id: Date.now().toString(), 
      title: req.file.originalname, 
      content, 
      type: "file", 
      mimeType: req.file.mimetype,
      createdAt: new Date() 
    };
    knowledgeData.push(newItem);
    await fs.writeFile(KNOWLEDGE_FILE, JSON.stringify(knowledgeData, null, 2));
    cachedKnowledge = knowledgeData; // Update cache
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process file upload" });
  }
});

app.delete("/api/admin/knowledge/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    let data = await getCachedKnowledge() || [];
    data = data.filter((item: any) => item.id !== id);
    await fs.writeFile(KNOWLEDGE_FILE, JSON.stringify(data, null, 2));
    cachedKnowledge = data; // Update cache
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete knowledge item" });
  }
});

// Chatbot API Endpoint
app.post("/api/lupus-chat", async (req, res) => {
  let { message, history, isAuraMode } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required and must be a string" });
  }

  // Safety: Sanitize input and limit length
  message = message.replace(/[\x00-\x1F\x7F-\x9F]/g, "").slice(0, 1000);
  if (!message.trim()) {
    return res.json({ response: "🐺 O silêncio é uma virtude, mas para treinar a matilha eu preciso de palavras, atleta." });
  }

  // Load custom knowledge and system instruction from cache
  let customKnowledge = "";
  let baseSystemInstruction = "";
  let isDirectMatch = false;
  let directContext = "";

  try {
    const data = await getCachedKnowledge();
    if (data && data.length > 0) {
      // Simple RAG-lite: Filter knowledge by keywords in the user message
      const searchTerms = message.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
      
      const relevantItems = data.filter((item: any) => {
        const titleMatch = searchTerms.some((k: string) => item.title.toLowerCase().includes(k));
        const contentMatch = searchTerms.some((k: string) => item.content.toLowerCase().includes(k));
        return titleMatch || contentMatch;
      });

      if (relevantItems.length > 0) {
        // High confidence matching for "financial viability" and "ultra-fast" responses
        isDirectMatch = true;
        directContext = relevantItems.map(it => it.content).join("\n");
        customKnowledge = "\n\nUSE ESTAS INFORMAÇÕES OFICIAIS PARA RESPONDER (PRIORIDADE MÁXIMA):\n" + 
          relevantItems.map((item: any) => `### ${item.title}\n${item.content}`).join("\n---\n");
      } else {
        // If no keyword match, take the 3 most recent items as general context
        customKnowledge = "\n\nCONTEXTO GERAL DA ACADEMIA:\n" + 
          data.slice(-3).map((item: any) => `### ${item.title}\n${item.content}`).join("\n---\n");
      }
    }
    baseSystemInstruction = await getCachedPrompt();
  } catch (e) {
    console.error("Knowledge/Prompt Load Error:", e);
  }

  // Optimized System Prompt for matches
  let systemInstruction = "";
  if (isDirectMatch) {
    // If we have a direct match, we give a very concise instruction to Groq to just "format" nicely
    systemInstruction = `Você é LÚPUS, o Lobo Alfa Cibernético da AuraGym. 
FATO RELEVANTE: ${directContext}

INSTRUÇÃO: O usuário fez uma pergunta que bate com nossa base de conhecimento. 
Responda de forma curta, simpática, agressiva (estilo matilha) e direta usando APENAS o fato acima. 
Não invente horários ou preços fora do que está no fato.
PROIBIÇÃO DE FORMATAÇÃO: É terminantemente proibido o uso de asteriscos (*) para negrito ou ênfase. Responda em texto puro.
Status Atual: ${isAuraMode ? "MODO AURA ATIVADO" : "MODO PADRÃO"}.`;
  } else {
    const dynamicStatus = `\n\nNo momento, o Modo Aura está ${isAuraMode ? "ATIVADO (VERMELHO/AURA OVERDRIVE)" : "DESATIVADO (VERDE/MODO PADRÃO)"}.`;
    systemInstruction = (process.env.GROQ_SYSTEM_PROMPT || baseSystemInstruction) + dynamicStatus + customKnowledge;
  }

  try {
    const groq = getGroq();
    const messages: any[] = [
      { role: "system", content: systemInstruction },
    ];

    // History processing
    if (Array.isArray(history)) {
      const slice = history.slice(-6);
      for (const turn of slice) {
        messages.push({
          role: turn.role === "bot" ? "assistant" : "user",
          content: turn.text
        });
      }
    }

    messages.push({ role: "user", content: message });

    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
    }).catch(e => {
      console.error("Groq API Request Failed:", e);
      throw e;
    });

    return res.json({ response: completion.choices[0]?.message?.content || "🐺 Lúpus ficou sem palavras na rede Groq." });

  } catch (error: any) {
    console.error("Groq API Error in backend:", error);
    const fallbackResult = `🐺 [CONEXÃO GROQ INSTÁVEL] Detectei uma oscilação na rede neural principal. Mas as diretrizes da matilha continuam claras:
    
📍 Endereço: Av. Paulista, 1200.
⏰ Horários: Seg-Sex (05h-23h), Sáb (08h-18h), Dom (09h-14h).
⚡ Biohacking: Ative o Modo Aura no topo do site para visualizar suplementos de elite!

Como posso ajudar na sua evolução hoje, atleta?`;
    return res.json({ response: fallbackResult });
  }
});

// Setup Vite Dev Middleware / Static file serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lupus Gym Groq-Powered Server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
