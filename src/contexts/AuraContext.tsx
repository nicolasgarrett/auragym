import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, signIn, logout, getUserProfile, updateUserProfile } from '../lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  auraModeEnabled: boolean;
  plan: string;
  xp: number;
  level: number;
  streak: number;
  lastCheckIn?: any;
  badges: string[];
}

export interface MemberRank {
  id: "neofast" | "titan" | "apex";
  name: string;
  badge: string;
  color: string;
  borderClass: string;
  textClass: string;
  description: string;
  minPlan: string;
  level: number;
}

export const MEMBER_RANKS: MemberRank[] = [
  {
    id: "neofast",
    name: "NeoFast",
    badge: "Bronze Tier",
    color: "#94A3B8",
    borderClass: "border-slate-800",
    textClass: "text-slate-400",
    description: "Iniciado do ecossistema. Postura de fundação e fortalecimento básico no parque de musculação.",
    minPlan: "Plano Silver (Incluso)",
    level: 1,
  },
  {
    id: "titan",
    name: "Titan Híbrido",
    badge: "Silver Tier",
    color: "#06B6D4",
    borderClass: "border-cyan-500/35",
    textClass: "text-cyan-400",
    description: "Atleta Híbrido Avançado. Libera acesso ao Protocolo Aura. Domínio metabólico, ganho muscular denso e circuitos intensivos.",
    minPlan: "Plano Ouro / Hybrid Lite",
    level: 2,
  },
  {
    id: "apex",
    name: "Apex Soberano",
    badge: "Gold Tier",
    color: "#E11D48",
    borderClass: "border-rose-500/40",
    textClass: "text-rose-500",
    description: "Nível Supremo de Biohacking. Acesso ilimitado 24/7, recuperação criogênica avançada, suplementação de elite e mentoria 360°.",
    minPlan: "Plano Black / Hybrid Max / Apex Elite",
    level: 3,
  }
];

export function getRankByPlan(planName: string = ""): MemberRank {
  const norm = planName.toLowerCase().trim();
  if (
    norm.includes("black") || 
    norm.includes("max") || 
    norm.includes("apex") || 
    norm.includes("elite") || 
    norm.includes("proto-x")
  ) {
    return MEMBER_RANKS[2]; // Apex Soberano
  }
  if (
    norm.includes("gold") || 
    norm.includes("lite") || 
    (norm !== "silver" && norm !== "" && norm !== "bronze")
  ) {
    return MEMBER_RANKS[1]; // Titan Híbrido
  }
  return MEMBER_RANKS[0]; // NeoFast
}

interface ActiveCheckout {
  planName: string;
  planPrice: string;
  initialStep: "intro" | "trial_form" | "pay_methods" | "trial_success" | "pay_cc" | "pay_pix" | "pay_boleto" | "pay_success";
}

interface AuraContextType {
  isAuraMode: boolean;
  setIsAuraMode: (val: boolean) => void;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  handleLogout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  activeCheckout: ActiveCheckout | null;
  openCheckout: (planName: string, planPrice: string, initialStep?: ActiveCheckout["initialStep"]) => void;
  closeCheckout: () => void;
  activeTab: "home" | "sobre-nos" | "blog" | "admin" | "treino";
  setActiveTab: (tab: "home" | "sobre-nos" | "blog" | "admin" | "treino") => void;
  isRankModalOpen: boolean;
  setIsRankModalOpen: (val: boolean) => void;
  currentRank: MemberRank;
  isAdmin: boolean;
  completeWorkout: () => Promise<void>;
}

const AuraContext = createContext<AuraContextType | undefined>(undefined);

export function AuraProvider({ children }: { children: React.ReactNode }) {
  const [isAuraModeState, setIsAuraModeState] = useState(() => {
    return localStorage.getItem('auragym_aura_mode') === 'true';
  });
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCheckout, setActiveCheckout] = useState<ActiveCheckout | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "sobre-nos" | "blog" | "admin" | "treino">("home");
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);

  const ADMIN_EMAILS = [
    'nicolasgarrett110@gmail.com',
    'admin@auragym.com.br',
    'abner.s.s.machado@gmail.com',
  ];

  const isAdmin = (user?.email && ADMIN_EMAILS.includes(user.email)) || localStorage.getItem('auragym_admin_force') === 'true';
  const currentRank = isAdmin ? MEMBER_RANKS[2] : getRankByPlan(profile?.plan || "");
  
  const initialProfile = {
    uid: user?.uid || "admin-forced",
    displayName: profile?.displayName || "Nicolas Garrett (ADMIN)",
    email: user?.email || profile?.email || "nicolasgarrett110@gmail.com",
    auraModeEnabled: isAuraModeState,
    plan: "Black VIP (Super Admin)",
    xp: profile?.xp || 15000,
    level: profile?.level || 99,
    streak: profile?.streak || 365,
    badges: profile?.badges || ["Fundador", "Soberano", "Lobo Alfa"]
  };

  const activeProfile = isAdmin ? initialProfile : profile;

  const completeWorkout = async () => {
    if (!user || !profile) return;

    const now = new Date();
    const lastCheckIn = profile.lastCheckIn?.toDate ? profile.lastCheckIn.toDate() : new Date(profile.lastCheckIn || 0);
    const isSameDay = lastCheckIn.toDateString() === now.toDateString();

    if (isSameDay) {
      alert("Você já completou seu treino de hoje! Ganhe mais XP amanhã. 🔥");
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const wasYesterday = lastCheckIn.toDateString() === yesterday.toDateString();

    let newStreak = wasYesterday ? (profile.streak || 0) + 1 : 1;
    let xpGain = 100 + (newStreak * 10); // Base 100 + bonus streak
    let newXp = (profile.xp || 0) + xpGain;
    let newLevel = Math.floor(newXp / 1000) + 1;

    // Badge logic
    const newBadges = [...(profile.badges || [])];
    if (newStreak >= 7 && !newBadges.includes("Determinado")) newBadges.push("Determinado");
    if (newLevel >= 10 && !newBadges.includes("Veterano")) newBadges.push("Veterano");

    await updateProfileData({
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      lastCheckIn: now,
      badges: newBadges
    });

    alert(`Treino Concluído! +${xpGain} XP | 🔥 Streak: ${newStreak} dias!`);
  };

  const setIsAuraMode = (val: boolean) => {
    if (val && !isAdmin) {
      if (currentRank.level < 2) {
        setIsRankModalOpen(true);
        return;
      }
    }
    setIsAuraModeState(val);
    localStorage.setItem('auragym_aura_mode', String(val));
    if (user) {
      updateUserProfile(user.uid, { auraModeEnabled: val }).catch(e => console.error(e));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const p = await getUserProfile(u.uid);
        const userProf = p as UserProfile;
        setProfile(userProf);
        
        const cachedMode = localStorage.getItem('auragym_aura_mode') === 'true';
        if (cachedMode) {
          setIsAuraModeState(true);
        } else if (userProf?.auraModeEnabled !== undefined) {
          const isUserAdmin = (u.email && ADMIN_EMAILS.includes(u.email)) || localStorage.getItem('auragym_admin_force') === 'true';
          const r = isUserAdmin ? MEMBER_RANKS[2] : getRankByPlan(userProf.plan || "");
          if (r.level >= 2 || isUserAdmin) {
            setIsAuraModeState(userProf.auraModeEnabled);
            localStorage.setItem('auragym_aura_mode', String(userProf.auraModeEnabled));
          } else {
            setIsAuraModeState(false);
            localStorage.setItem('auragym_aura_mode', 'false');
          }
        }
      } else {
        setProfile(null);
        const cachedMode = localStorage.getItem('auragym_aura_mode') === 'true';
        if (!cachedMode) {
          setIsAuraModeState(false);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isAuraModeState) {
      document.body.classList.add('aura-mode');
    } else {
      document.body.classList.remove('aura-mode');
    }
  }, [isAuraModeState]);

  const login = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await logout();
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user) return;
    await updateUserProfile(user.uid, data);
    const updated = await getUserProfile(user.uid);
    const userProf = updated as UserProfile;
    setProfile(userProf);
    
    if (data.auraModeEnabled !== undefined) {
      const isUserAdmin = (user.email && ADMIN_EMAILS.includes(user.email)) || localStorage.getItem('auragym_admin_force') === 'true';
      const r = isUserAdmin ? MEMBER_RANKS[2] : getRankByPlan(userProf?.plan || "");
      if (r.level >= 2 || isUserAdmin) {
        setIsAuraModeState(data.auraModeEnabled);
        localStorage.setItem('auragym_aura_mode', String(data.auraModeEnabled));
      } else {
        setIsAuraModeState(false);
        localStorage.setItem('auragym_aura_mode', 'false');
        if (data.auraModeEnabled) {
          setIsRankModalOpen(true);
        }
      }
    }
  };

  const openCheckout = (planName: string, planPrice: string, initialStep: ActiveCheckout["initialStep"] = "intro") => {
    setActiveCheckout({ planName, planPrice, initialStep });
  };

  const closeCheckout = () => {
    setActiveCheckout(null);
  };

  return (
    <AuraContext.Provider value={{ 
      isAuraMode: isAuraModeState, 
      setIsAuraMode, 
      user, 
      profile: activeProfile,
      loading, 
      login, 
      handleLogout,
      updateProfile: updateProfileData,
      activeCheckout,
      openCheckout,
      closeCheckout,
      activeTab,
      setActiveTab,
      isRankModalOpen,
      setIsRankModalOpen,
      currentRank,
      isAdmin,
      completeWorkout
    }}>
      {children}
    </AuraContext.Provider>
  );
}

export function useAura() {
  const context = useContext(AuraContext);
  if (context === undefined) {
    throw new Error('useAura must be used within an AuraProvider');
  }
  return context;
}
