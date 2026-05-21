import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Brain, Plus, FileText, Trash2, Upload, Loader2, Search, Database, Shield, Zap, TrendingUp, Users, Save } from "lucide-react";
import { useAura } from "../contexts/AuraContext";

export default function AdminDashboard() {
  const { isAuraMode, user } = useAura();
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isPromptSaving, setIsPromptSaving] = useState(false);

  useEffect(() => {
    fetchKnowledge();
    fetchPrompt();
  }, []);

  const fetchPrompt = async () => {
    try {
      const res = await fetch("/api/admin/prompt", {
        headers: { "x-admin-email": user?.email || "" }
      });
      const data = await res.json();
      if (data.content) {
        setSystemPrompt(data.content);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePrompt = async () => {
    setIsPromptSaving(true);
    try {
      const res = await fetch("/api/admin/prompt", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-email": user?.email || ""
        },
        body: JSON.stringify({ content: systemPrompt })
      });
      if (res.ok) alert("Prompt sincronizado com sucesso!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsPromptSaving(false);
    }
  };

  const fetchKnowledge = async () => {
    try {
      const res = await fetch("/api/admin/knowledge", {
        headers: { "x-admin-email": user?.email || "" }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setKnowledge(data);
      } else {
        console.error("Knowledge base returned non-array:", data);
        setKnowledge([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTextEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/knowledge/text", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-email": user?.email || ""
        },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      if (res.ok) {
        setNewTitle("");
        setNewContent("");
        fetchKnowledge();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/knowledge/file", {
        method: "POST",
        headers: { "x-admin-email": user?.email || "" },
        body: formData
      });
      if (res.ok) {
        fetchKnowledge();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteKnowledge = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/knowledge/${id}`, { 
        method: "DELETE",
        headers: { "x-admin-email": user?.email || "" }
      });
      if (res.ok) fetchKnowledge();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredKnowledge = knowledge.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${isAuraMode ? 'bg-aura/10' : 'bg-accent/10'}`}>
              <Shield className={`w-8 h-8 ${isAuraMode ? 'text-aura' : 'text-accent'}`} />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                Painel do <span className={isAuraMode ? 'text-aura' : 'text-accent'}>Soberano</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Lúpus Alpha Intelligence & Knowledge Management</p>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Matilha Ativa", value: "1,284", icon: Users, color: "text-blue-400" },
            { label: "Memórias Lúpus", value: knowledge.length, icon: Brain, color: "text-red-500" },
            { label: "Performance Média", value: "98.2%", icon: TrendingUp, color: "text-green-500" },
            { label: "Modo Aura Ativo", value: isAuraMode ? "SIM" : "NÃO", icon: Zap, color: isAuraMode ? "text-cyan-400" : "text-slate-600" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.05] transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Live</span>
              </div>
              <h3 className="text-2xl font-black mb-1">{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Input */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <section className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-red-500/10 transition-all duration-700" />
                
                <h2 className="text-sm font-black uppercase tracking-[0.25em] text-red-500 mb-8 flex items-center gap-3">
                  <Plus className="w-5 h-5" /> Injetar Conhecimento
                </h2>

                <form onSubmit={handleAddTextEntry} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">Assunto / Título</label>
                    <input
                      type="text"
                      placeholder="EX: PROTOCOLO DE SUPLEMENTAÇÃO"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:border-red-500 outline-none transition-all placeholder:text-slate-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 pl-2">Conteúdo Detalhado</label>
                    <textarea
                      placeholder="DESCREVA OS DETALHES PARA O LÚPUS..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={6}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold uppercase tracking-widest focus:border-red-500 outline-none transition-all resize-none placeholder:text-slate-700 scrollbar-hide"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !newTitle || !newContent}
                    className="w-full py-5 rounded-2xl bg-red-500 text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-400 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(239,68,68,0.2)] disabled:opacity-50 disabled:scale-100"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    Sincronizar Texto
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <label className="w-full flex items-center justify-center gap-3 py-6 rounded-2xl border border-dashed border-white/10 text-slate-500 hover:text-white hover:border-white/30 hover:bg-white/[0.01] cursor-pointer transition-all group">
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Upload de Matriz</p>
                      <p className="text-[8px] font-bold opacity-50 uppercase tracking-widest">PDF, DOCX ou Imagens (OCR)</p>
                    </div>
                    <input type="file" className="hidden" accept=".pdf,image/*,.txt,.doc,.docx" onChange={handleFileUpload} />
                  </label>
                </div>
              </section>

              <section className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-all duration-700" />
                
                <h2 className="text-sm font-black uppercase tracking-[0.25em] text-cyan-500 mb-8 flex items-center gap-3">
                  <Zap className="w-5 h-5" /> Regras do Lúpus (Prompt)
                </h2>

                <div className="space-y-4">
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={12}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-mono text-slate-400 focus:text-white focus:border-cyan-500 outline-none transition-all resize-none scrollbar-hide"
                  />
                  <button
                    onClick={handleSavePrompt}
                    disabled={isPromptSaving}
                    className="w-full py-5 rounded-2xl bg-cyan-500 text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(6,182,212,0.2)] disabled:opacity-50"
                  >
                    {isPromptSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Atualizar Diretrizes
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Right: Knowledge Base List */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 min-h-[600px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-3">
                  <Database className="w-5 h-5" /> Memória de Longo Prazo
                </h2>
                
                <div className="relative w-full md:w-64 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    placeholder="BUSCAR NA MEMÓRIA..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-6 text-[9px] font-black uppercase tracking-widest focus:border-white/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredKnowledge.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 opacity-20 text-center">
                    <Brain className="w-16 h-16 mb-4" />
                    <p className="text-xs font-black uppercase tracking-[0.3em]">Nenhum dado sincronizado</p>
                  </div>
                ) : (
                  filteredKnowledge.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group bg-white/[0.01] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.03] hover:border-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-5">
                          <div className={`p-4 rounded-2xl ${item.type === 'file' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'}`}>
                            {item.type === 'file' ? <FileText className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="text-xs font-black uppercase tracking-widest mb-2 group-hover:text-red-500 transition-colors">{item.title}</h3>
                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed line-clamp-2 mb-3 max-w-2xl bg-black/20 p-2 rounded-lg">
                              {item.content}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-[8px] font-black uppercase tracking-widest py-1 px-3 rounded-full bg-white/5 text-slate-400">
                                {item.type}
                              </span>
                              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                                Sincronizado em {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteKnowledge(item.id)}
                          className="p-3 rounded-xl hover:bg-red-500/10 text-slate-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
