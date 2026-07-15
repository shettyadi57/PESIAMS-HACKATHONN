"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft, ArrowRight, Check, User, Users, BookOpen,
  CreditCard, Phone, Mail, ChevronDown, Trophy, Plus, X,
  Shield, Zap, IndianRupee, Copy, ExternalLink, AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TeamMember { name: string; usn: string; email: string; phone: string; year: string; }
interface FormData {
  teamName: string; domain: string; ideaTitle: string; ideaSummary: string;
  leader: TeamMember; members: TeamMember[];
  college: string; city: string; state: string; agreed: boolean;
}
interface RegStats { count: number; max: number; spotsLeft: number; isFull: boolean; }

// ─── Constants ────────────────────────────────────────────────────────────────
const DOMAINS = [
  "Web / App Development","AI / Machine Learning","Cybersecurity",
  "IoT / Embedded Systems","Blockchain","Data Science & Analytics",
  "Game Development","Cloud & DevOps","AR / VR / XR","Open Innovation",
];
const YEARS = ["1st Year","2nd Year","3rd Year","4th Year"];
const STEPS = [
  { id:1, label:"Team",    sub:"Identity & Idea",   icon: Trophy      },
  { id:2, label:"Leader",  sub:"Point of Contact",  icon: User        },
  { id:3, label:"Members", sub:"Your Crew",          icon: Users       },
  { id:4, label:"College", sub:"Institution",        icon: BookOpen    },
  { id:5, label:"Payment", sub:"₹1,000 Entry Fee",   icon: CreditCard  },
];
const ENTRY_FEE = 1000;
const emptyMember = (): TeamMember => ({ name:"",usn:"",email:"",phone:"",year:"" });
const initialForm: FormData = {
  teamName:"",domain:"",ideaTitle:"",ideaSummary:"",
  leader: emptyMember(), members:[emptyMember(),emptyMember()],
  college:"",city:"",state:"",agreed:false,
};

// ─── Utility ──────────────────────────────────────────────────────────────────
function fireConfetti() {
  const fire = (opts: confetti.Options) => confetti({ ...opts, disableForReducedMotion:true });
  fire({ particleCount:60, spread:80, origin:{y:0.6}, colors:["#8b5cf6","#06b6d4","#ffffff"] });
  setTimeout(()=>fire({ particleCount:40, spread:100, origin:{y:0.5}, colors:["#8b5cf6","#ec4899","#06b6d4"] }), 300);
  setTimeout(()=>fire({ particleCount:30, spread:70, origin:{y:0.7,x:0.2}, colors:["#ffffff","#8b5cf6"] }), 500);
  setTimeout(()=>fire({ particleCount:30, spread:70, origin:{y:0.7,x:0.8}, colors:["#06b6d4","#ffffff"] }), 600);
}

// ─── Background ───────────────────────────────────────────────────────────────
function BgBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full"
        style={{ background:"radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 68%)" }} />
      <div className="absolute -bottom-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full"
        style={{ background:"radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 68%)" }} />
      <div className="absolute inset-0 grid-bg opacity-[0.022]" />
    </div>
  );
}

// ─── Spots Banner ─────────────────────────────────────────────────────────────
function SpotsBanner({ stats }: { stats: RegStats | null }) {
  if (!stats) return null;
  const pct = ((stats.count / stats.max) * 100).toFixed(0);
  return (
    <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
      className="w-full max-w-2xl mx-auto mb-6 px-4">
      <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full animate-pulse ${stats.spotsLeft <= 5 ? "bg-red-400" : stats.spotsLeft <= 15 ? "bg-amber-400" : "bg-emerald-400"}`} />
          <span className="text-xs font-bold text-white">
            {stats.isFull ? "Registrations Closed" : <>{stats.spotsLeft} <span className="text-zinc-400 font-normal">spots remaining</span></>}
          </span>
        </div>
        <div className="flex-1 max-w-[140px]">
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
              initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:1,ease:"easeOut"}} />
          </div>
        </div>
        <span className="text-[10px] text-zinc-600 font-bold">{stats.count}/{stats.max}</span>
      </div>
    </motion.div>
  );
}

// ─── Step Sidebar ─────────────────────────────────────────────────────────────
function StepSidebar({ current }: { current: number }) {
  return (
    <div className="hidden lg:flex flex-col gap-1 w-52 shrink-0 pt-2">
      {STEPS.map((step, idx) => {
        const done = current > step.id;
        const active = current === step.id;
        const Icon = step.icon;
        return (
          <motion.div key={step.id} initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} transition={{delay:idx*0.07}}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              active ? "bg-accent-violet/12 border border-accent-violet/25" :
              done   ? "bg-white/[0.03]" : "opacity-40"
            }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
              done   ? "bg-accent-cyan text-black" :
              active ? "bg-accent-violet/30 text-accent-violet shadow-[0_0_12px_rgba(139,92,246,0.4)]" :
                       "bg-white/5 text-zinc-600"
            }`}>
              {done ? <Check size={14} strokeWidth={3}/> : <Icon size={14}/>}
            </div>
            <div>
              <p className={`text-[11px] font-black uppercase tracking-wider ${active?"text-white":done?"text-zinc-300":"text-zinc-600"}`}>
                {step.label}
              </p>
              <p className={`text-[9px] mt-0.5 ${active?"text-accent-violet":done?"text-zinc-600":"text-zinc-700"}`}>
                {step.sub}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Mobile Step Bar ──────────────────────────────────────────────────────────
function MobileStepBar({ current }: { current: number }) {
  return (
    <div className="flex lg:hidden items-center justify-center gap-1.5 mb-8">
      {STEPS.map((step, idx) => {
        const done = current > step.id;
        const active = current === step.id;
        const Icon = step.icon;
        return (
          <React.Fragment key={step.id}>
            <div className={`flex flex-col items-center ${idx < STEPS.length-1 ? "gap-0" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-400 ${
                done   ? "bg-accent-cyan border-accent-cyan text-black" :
                active ? "bg-accent-violet/20 border-accent-violet text-accent-violet shadow-[0_0_14px_rgba(139,92,246,0.5)]" :
                         "bg-white/5 border-white/12 text-zinc-600"
              }`}>
                {done ? <Check size={12} strokeWidth={3}/> : <Icon size={12}/>}
              </div>
            </div>
            {idx < STEPS.length-1 && (
              <div className={`h-[2px] w-6 sm:w-10 rounded-full transition-all duration-400 ${
                current > step.id ? "bg-gradient-to-r from-accent-cyan to-accent-violet" : "bg-white/8"
              }`}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Field Primitives ─────────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="flex items-center gap-1 text-[10.5px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">
      {children}{required && <span className="text-accent-violet">*</span>}
    </label>
  );
}

type IconType = React.ComponentType<{ size?: number; className?: string }>;

function TInput({ value, onChange, placeholder, icon: Icon, type="text", error }:
  { value:string; onChange:(v:string)=>void; placeholder:string; icon?:IconType; type?:string; error?:string; }) {
  const hasVal = value.trim().length > 0;
  return (
    <div className="relative group">
      {Icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none flex">
        {React.createElement(Icon,{size:13})}
      </span>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className={`w-full ${Icon?"pl-9":"pl-4"} pr-10 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300
          ${error ? "border-red-500/50 focus:border-red-500/80" :
            hasVal ? "border-accent-violet/30 focus:border-accent-violet/60 focus:bg-white/[0.06]" :
                     "border-white/10 focus:border-accent-violet/50 focus:bg-white/[0.06]"}`}
      />
      {hasVal && !error && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent-cyan/20 flex items-center justify-center">
          <Check size={9} className="text-accent-cyan" strokeWidth={3}/>
        </div>
      )}
      {error && <p className="mt-1 text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function SInput({ value, onChange, options, placeholder }:
  { value:string; onChange:(v:string)=>void; options:string[]; placeholder:string; }) {
  return (
    <div className="relative">
      <select value={value} onChange={e=>onChange(e.target.value)} style={{colorScheme:"dark"}}
        className={`w-full pl-4 pr-10 py-3 bg-white/[0.04] border rounded-xl text-sm focus:outline-none transition-all duration-300 appearance-none
          ${value ? "border-accent-violet/30 text-white focus:border-accent-violet/60" : "border-white/10 text-zinc-600 focus:border-accent-violet/50"}`}>
        <option value="" disabled className="bg-zinc-900 text-zinc-500">{placeholder}</option>
        {options.map(o=><option key={o} value={o} className="bg-zinc-900 text-white">{o}</option>)}
      </select>
      <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"/>
      {value && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent-cyan/20 flex items-center justify-center">
          <Check size={9} className="text-accent-cyan" strokeWidth={3}/>
        </div>
      )}
    </div>
  );
}

// ─── Member Block ─────────────────────────────────────────────────────────────
function MemberBlock({ member, onChange, title, accent }:
  { member:TeamMember; onChange:(p:Partial<TeamMember>)=>void; title:string; accent?:boolean; }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 ${
      accent ? "border-accent-violet/25 bg-gradient-to-br from-accent-violet/8 to-transparent"
             : "border-white/8 bg-white/[0.02]"}`}>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${accent?"text-accent-violet":"text-zinc-500"}`}>{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Label required>Full Name</Label>
          <TInput value={member.name} onChange={v=>onChange({name:v})} placeholder="Full name" icon={User}/></div>
        <div><Label required>USN / Roll No.</Label>
          <TInput value={member.usn} onChange={v=>onChange({usn:v})} placeholder="e.g. 1PE22BCA001"/></div>
        <div><Label required>Email</Label>
          <TInput value={member.email} onChange={v=>onChange({email:v})} placeholder="student@email.com" icon={Mail} type="email"/></div>
        <div><Label required>Phone</Label>
          <TInput value={member.phone} onChange={v=>onChange({phone:v})} placeholder="+91 XXXXX XXXXX" icon={Phone} type="tel"/></div>
        <div className="sm:col-span-2"><Label required>Year of Study</Label>
          <SInput value={member.year} onChange={v=>onChange({year:v})} options={YEARS} placeholder="Select year"/></div>
      </div>
    </div>
  );
}

// ─── Steps 1–4 ────────────────────────────────────────────────────────────────
function Step1({ d, s }: { d:FormData; s:React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-accent-violet/8 border border-accent-violet/20 flex items-start gap-3">
        <Trophy size={16} className="text-accent-violet shrink-0 mt-0.5"/>
        <p className="text-xs text-zinc-400 leading-relaxed">Tell us about your team. Choose a domain that best fits your project idea — you can refine it on the day.</p>
      </div>
      <div><Label required>Team Name</Label><TInput value={d.teamName} onChange={v=>s(p=>({...p,teamName:v}))} placeholder="e.g. Binary Rebels" icon={Users}/></div>
      <div><Label required>Domain / Track</Label><SInput value={d.domain} onChange={v=>s(p=>({...p,domain:v}))} options={DOMAINS} placeholder="Choose your innovation track"/></div>
      <div><Label required>Project Idea Title</Label><TInput value={d.ideaTitle} onChange={v=>s(p=>({...p,ideaTitle:v}))} placeholder="e.g. AI-Powered Campus Safety System"/></div>
      <div>
        <Label required>Idea Summary</Label>
        <textarea value={d.ideaSummary} onChange={e=>s(p=>({...p,ideaSummary:e.target.value.slice(0,300)}))} rows={4} placeholder="Describe the problem you're solving, your solution, and the tech stack you'll use..."
          className={`w-full px-4 py-3 bg-white/[0.04] border rounded-xl text-sm text-white placeholder-zinc-600 resize-none focus:outline-none transition-all duration-300 ${
            d.ideaSummary ? "border-accent-violet/30 focus:border-accent-violet/60":"border-white/10 focus:border-accent-violet/50"}`}/>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-zinc-700">Min 50 characters</span>
          <span className={`text-[10px] ${d.ideaSummary.length>=50?"text-accent-cyan":"text-zinc-600"}`}>{d.ideaSummary.length}/300</span>
        </div>
      </div>
    </div>
  );
}

function Step2({ d, s }: { d:FormData; s:React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-accent-violet/8 border border-accent-violet/20 flex items-start gap-3">
        <User size={16} className="text-accent-violet shrink-0 mt-0.5"/>
        <p className="text-xs text-zinc-400 leading-relaxed">The team leader is our main point of contact. All confirmations and updates will be sent to their email and phone.</p>
      </div>
      <MemberBlock member={d.leader} onChange={p=>s(f=>({...f,leader:{...f.leader,...p}}))} title="Team Leader — Primary Contact" accent/>
    </div>
  );
}

function Step3({ d, s }: { d:FormData; s:React.Dispatch<React.SetStateAction<FormData>> }) {
  const total = d.members.length + 1;
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-[11px] font-black border ${total>=3&&total<=4?"border-emerald-500/30 bg-emerald-500/10 text-emerald-400":"border-amber-500/30 bg-amber-500/10 text-amber-400"}`}>
            {total} member{total!==1?"s":""}
          </div>
          <span className="text-[11px] text-zinc-600">of 3–4 required</span>
        </div>
        {d.members.length < 3 && (
          <button type="button" onClick={()=>s(p=>({...p,members:[...p.members,emptyMember()]}))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent-violet/30 text-accent-violet hover:bg-accent-violet/10 text-xs font-bold transition-all">
            <Plus size={11}/> Add Member
          </button>
        )}
      </div>
      {d.members.map((m,idx)=>(
        <div key={idx} className="relative">
          <MemberBlock member={m} onChange={p=>s(f=>{const ms=[...f.members];ms[idx]={...ms[idx],...p};return{...f,members:ms};})} title={`Member ${idx+2}`}/>
          {d.members.length > 2 && (
            <button type="button" onClick={()=>s(p=>({...p,members:p.members.filter((_,i)=>i!==idx)}))}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all">
              <X size={13}/>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function Step4({ d, s }: { d:FormData; s:React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-5">
      <div><Label required>College / Institution</Label><TInput value={d.college} onChange={v=>s(p=>({...p,college:v}))} placeholder="e.g. PESIAMS, Shivamogga" icon={BookOpen}/></div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label required>City</Label><TInput value={d.city} onChange={v=>s(p=>({...p,city:v}))} placeholder="Shivamogga"/></div>
        <div><Label required>State</Label><TInput value={d.state} onChange={v=>s(p=>({...p,state:v}))} placeholder="Karnataka"/></div>
      </div>
      <div className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Declaration</p>
        <ul className="space-y-2">
          {["All members are currently enrolled BCA / B.Sc. CS students or equivalent.",
            "The project idea is original and not submitted to any other hackathon.",
            "We agree to abide by UTKARSH 1.0 rules and the code of conduct.",
            "PESIAMS may showcase our project for academic and promotional purposes.",
          ].map(item=>(
            <li key={item} className="flex items-start gap-2 text-xs text-zinc-500">
              <Check size={11} className="text-accent-cyan mt-0.5 shrink-0"/>{item}
            </li>
          ))}
        </ul>
        <label className="flex items-start gap-3 cursor-pointer group pt-2">
          <button type="button" onClick={()=>s(p=>({...p,agreed:!p.agreed}))}
            className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all duration-300 shrink-0 mt-0.5 ${
              d.agreed?"bg-accent-violet border-accent-violet shadow-[0_0_10px_rgba(139,92,246,0.4)]":"border-white/20 group-hover:border-accent-violet/50"}`}>
            {d.agreed && <Check size={11} strokeWidth={3} className="text-white"/>}
          </button>
          <span className="text-xs text-zinc-400 leading-snug">I confirm all details are accurate and my team accepts the terms above.</span>
        </label>
      </div>
    </div>
  );
}

// ─── Step 5: Payment ──────────────────────────────────────────────────────────
function Step5({ form, onPaymentSuccess }:
  { form: FormData; onPaymentSuccess:(id:string)=>void; }) {
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const totalMembers = form.members.length + 1; // +1 leader

  const handlePay = async () => {
    setPaying(true);
    setPayError("");
    try {
      // 1. Create order
      const orderRes = await fetch("/api/payment/order", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ teamName: form.teamName, amount: ENTRY_FEE * 100 }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Order creation failed");

      const verifyAndSave = async (paymentDetails: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        isDemo?: boolean;
      }) => {
        const verifyRes = await fetch("/api/payment/verify", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ ...paymentDetails, formData: form }),
        });
        const vData = await verifyRes.json();
        if (!verifyRes.ok) throw new Error(vData.error || "Verification failed");
        return vData.registrationId;
      };

      // DEMO MODE — show simulated Razorpay-like flow
      if (orderData.isDemo) {
        // Simulate 2s "payment processing"
        await new Promise(r => setTimeout(r, 2200));
        const regId = await verifyAndSave({
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_DEMO_${Date.now()}`,
          razorpay_signature: "demo_signature",
          isDemo: true,
        });
        onPaymentSuccess(regId);
        return;
      }

      // REAL Razorpay — load the script and open checkout
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Razorpay"));
        document.head.appendChild(script);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "UTKARSH 1.0",
        description: "Hackathon Registration — Entry Fee",
        image: "/favicon.ico",
        prefill: { name: form.leader.name, email: form.leader.email, contact: form.leader.phone },
        theme: { color: "#8b5cf6" },
        handler: async (response: { razorpay_order_id:string; razorpay_payment_id:string; razorpay_signature:string }) => {
          try {
            const regId = await verifyAndSave(response);
            onPaymentSuccess(regId);
          } catch(e) {
            setPayError(e instanceof Error ? e.message : "Verification failed");
            setPaying(false);
          }
        },
        modal: { ondismiss: () => { setPaying(false); } },
      });
      rzp.open();
    } catch(e) {
      setPayError(e instanceof Error ? e.message : "Something went wrong");
      setPaying(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Fee Breakdown Card */}
      <div className="rounded-2xl overflow-hidden border border-accent-violet/20"
        style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.10) 0%,rgba(6,182,212,0.06) 100%)" }}>
        <div className="px-5 pt-5 pb-4 border-b border-white/6">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Fee Breakdown</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Team registration</span>
              <span className="text-sm text-white font-semibold">₹1,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">Processing fee</span>
              <span className="text-sm text-emerald-400 font-semibold">FREE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">GST / Tax</span>
              <span className="text-sm text-emerald-400 font-semibold">FREE</span>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-0.5">Total Amount</p>
            <div className="flex items-baseline gap-1">
              <IndianRupee size={18} className="text-white mb-0.5"/>
              <span className="font-display font-black text-3xl text-white">1,000</span>
              <span className="text-zinc-500 text-sm">/team</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-600 font-bold">One-time · Non-refundable</p>
            <p className="text-[9px] text-zinc-700 mt-0.5">Covers all {totalMembers} team members</p>
          </div>
        </div>
      </div>

      {/* What's included */}
      <div className="grid grid-cols-2 gap-3">
        {[
          ["🎪","Full-day access","Sep 5, 2026"],
          ["🍽️","Meals included","Breakfast + Lunch"],
          ["🏆","Prize pool","₹50,000+"],
          ["📜","Certificates","All participants"],
        ].map(([icon,title,sub])=>(
          <div key={title} className="p-3 rounded-xl border border-white/6 bg-white/[0.02] flex items-start gap-2.5">
            <span className="text-lg leading-none">{icon}</span>
            <div>
              <p className="text-[11px] font-bold text-white">{title}</p>
              <p className="text-[10px] text-zinc-600">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Summary */}
      <div className="p-4 rounded-xl border border-white/6 bg-white/[0.02]">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-3">Registering As</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display font-black text-base text-white">{form.teamName}</p>
            <p className="text-xs text-zinc-500">{form.domain} · {totalMembers} members</p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-accent-violet/15 border border-accent-violet/25">
            <p className="text-[10px] font-black text-accent-violet uppercase tracking-wider">{form.ideaTitle.slice(0,20)}{form.ideaTitle.length>20?"…":""}</p>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-2.5 text-zinc-600">
        <Shield size={13} className="text-emerald-500 shrink-0"/>
        <p className="text-[11px]">Payments are processed securely via <span className="text-zinc-400 font-semibold">Razorpay</span>. Supports UPI, cards & net banking.</p>
      </div>

      {payError && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25">
          <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>
          <p className="text-xs text-red-400">{payError}</p>
        </div>
      )}

      {/* Pay Button */}
      <motion.button type="button" onClick={handlePay} disabled={paying}
        whileHover={{scale:1.01}} whileTap={{scale:0.98}}
        className="w-full py-4 rounded-2xl font-display font-black text-white text-base tracking-wide flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:pointer-events-none"
        style={{ background:"linear-gradient(135deg,#8b5cf6 0%,#06b6d4 100%)", boxShadow:"0 0 40px rgba(139,92,246,0.4),0 4px 20px rgba(6,182,212,0.2)" }}>
        {paying ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12"/>
            </svg>
            Processing Payment…
          </>
        ) : (
          <>
            <IndianRupee size={18}/>
            Pay ₹1,000 &amp; Register
            <Zap size={16} className="animate-pulse"/>
          </>
        )}
      </motion.button>
      <p className="text-center text-[10px] text-zinc-700">By paying you agree to our terms. Amount is non-refundable after registration.</p>
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ registrationId, teamName }: { registrationId:string; teamName:string; }) {
  const [copied, setCopied] = useState(false);
  const copyId = () => {
    navigator.clipboard.writeText(registrationId).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); });
  };

  return (
    <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
      transition={{type:"spring",stiffness:70,damping:14}}
      className="flex flex-col items-center text-center py-4">

      {/* Glow circle */}
      <div className="relative mb-8">
        <motion.div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          initial={{scale:0}} animate={{scale:1}} transition={{delay:0.1,type:"spring",stiffness:80,damping:12}}
          style={{ background:"radial-gradient(circle,rgba(6,182,212,0.2) 0%,rgba(139,92,246,0.12) 60%,transparent 100%)",
            border:"2px solid rgba(6,182,212,0.4)", boxShadow:"0 0 60px rgba(6,182,212,0.3),0 0 120px rgba(139,92,246,0.15)" }}>
          <Check size={46} className="text-accent-cyan" strokeWidth={2.5}/>
        </motion.div>
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4}}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
          <Check size={12} strokeWidth={3} className="text-white"/>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25}}>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-cyan mb-2">Registration Confirmed</p>
        <h2 className="font-display font-black text-4xl text-white mb-2 tracking-tight">You&apos;re In! 🎉</h2>
        <p className="text-zinc-400 text-sm mb-1">
          Team <span className="text-white font-bold">&ldquo;{teamName}&rdquo;</span> is registered for UTKARSH 1.0.
        </p>
        <p className="text-zinc-600 text-xs max-w-sm mx-auto mb-6 leading-relaxed">
          Confirmation email sent to your team leader. Watch your WhatsApp for event updates.
        </p>
      </motion.div>

      {/* Registration ID Card */}
      <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
        className="w-full max-w-sm mb-8">
        <div className="rounded-2xl p-5 border border-accent-violet/25"
          style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.12),rgba(6,182,212,0.06))" }}>
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Your Registration ID</p>
          <div className="flex items-center justify-between gap-3">
            <code className="font-display font-black text-xl text-white tracking-wider">{registrationId}</code>
            <button onClick={copyId} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/12 text-zinc-400 hover:text-white hover:border-white/25 transition-all text-xs">
              {copied ? <><Check size={11} className="text-emerald-400"/>Copied!</> : <><Copy size={11}/>Copy</>}
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2">Keep this ID for reference. Bring it on the day of the event.</p>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.55}}
        className="w-full max-w-sm mb-8 space-y-2.5">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-3">What Happens Next</p>
        {[
          ["📧","Confirmation email","Within 24 hours to your leader"],
          ["💬","WhatsApp group invite","Watch your phone"],
          ["📍","Event Day","Sep 5, 2026 · PESIAMS Campus"],
        ].map(([icon,title,sub])=>(
          <div key={title} className="flex items-center gap-3 p-3 rounded-xl border border-white/6 bg-white/[0.02] text-left">
            <span className="text-lg">{icon}</span>
            <div>
              <p className="text-xs font-semibold text-white">{title}</p>
              <p className="text-[10px] text-zinc-600">{sub}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}} className="flex gap-3">
        <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-all active:scale-95">
          <ArrowLeft size={13}/> Back to UTKARSH 1.0
        </Link>
        <a href="https://www.instagram.com/pesiams_official/" target="_blank" rel="noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/12 text-zinc-400 hover:text-white hover:border-white/25 text-sm font-semibold transition-all">
          <ExternalLink size={12}/> Follow Updates
        </a>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [step, setStep]           = useState(1);
  const [form, setForm]           = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId]         = useState("");
  const [dir, setDir]             = useState(1);
  const [stats, setStats]         = useState<RegStats|null>(null);
  const topRef                    = useRef<HTMLDivElement>(null);

  // Fetch live spots
  useEffect(()=>{
    fetch("/api/register").then(r=>r.json()).then(setStats).catch(()=>{});
  },[]);

  // Scroll top on step change
  useEffect(()=>{ topRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); },[step]);

  // Fire confetti on success
  useEffect(()=>{ if(submitted) { setTimeout(fireConfetti,400); } },[submitted]);

  const canProceed = useCallback(()=>{
    if(step===1) return !!(form.teamName&&form.domain&&form.ideaTitle&&form.ideaSummary.length>=50);
    if(step===2){ const l=form.leader; return !!(l.name&&l.usn&&l.email&&l.phone&&l.year); }
    if(step===3){ const tot=form.members.length+1; if(tot<3||tot>4) return false; return form.members.every(m=>m.name&&m.usn&&m.email&&m.phone&&m.year); }
    if(step===4) return !!(form.college&&form.city&&form.state&&form.agreed);
    return true;
  },[step,form]);

  const goNext = ()=>{ if(canProceed()&&step<5){ setDir(1); setStep(s=>s+1); } };
  const goBack = ()=>{ if(step>1){ setDir(-1); setStep(s=>s-1); } };

  const slideV = {
    enter:  (d:number)=>({ x:d>0?60:-60, opacity:0, filter:"blur(5px)" }),
    center:            ({ x:0, opacity:1, filter:"blur(0px)" }),
    exit:   (d:number)=>({ x:d<0?60:-60, opacity:0, filter:"blur(5px)" }),
  };

  const stepTitle = ["Team Identity","Team Leader","Team Members","College Info","Payment"][step-1];
  const stepSub   = ["Your idea & domain","Primary contact","Your crew","Where you study","Entry fee ₹1,000"][step-1];
  const isFull    = stats?.isFull ?? false;

  return (
    <div className="min-h-screen bg-background text-foreground relative" ref={topRef}>
      <BgBlobs/>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-300"/>
          UTKARSH 1.0
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse"/>
          <span className="font-display font-black text-sm text-white">Registration Open</span>
        </div>
      </nav>

      <main className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {!submitted && (
          <>
            {/* Header */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="text-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-accent-cyan block mb-2">
                UTKARSH 1.0 · Sep 5, 2026 · PESIAMS Shivamogga
              </span>
              <h1 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight mb-2 leading-none">
                Register Your Team
              </h1>
              <p className="text-zinc-600 text-sm">5 steps · ~4 minutes · ₹1,000 entry fee</p>
            </motion.div>

            <SpotsBanner stats={stats}/>
          </>
        )}

        {isFull && !submitted ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="font-display font-black text-2xl text-white mb-2">Registrations Are Full</h2>
            <p className="text-zinc-500 text-sm mb-6">All 50 team spots have been taken. Follow us on Instagram for future events.</p>
            <Link href="/" className="px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all">Back to Home</Link>
          </div>
        ) : submitted ? (
          <SuccessScreen registrationId={regId} teamName={form.teamName}/>
        ) : (
          <div className="flex gap-6 items-start">
            {/* Sidebar */}
            <StepSidebar current={step}/>

            {/* Main Card */}
            <div className="flex-1 min-w-0">
              {/* Card wrapper with gradient border */}
              <div className="rounded-[28px] p-[1.5px]"
                style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.55) 0%,rgba(6,182,212,0.35) 50%,rgba(255,255,255,0.05) 100%)" }}>
                <div className="rounded-[27px] px-6 py-8 sm:px-8 sm:py-10"
                  style={{ background:"rgba(5,5,9,0.94)", backdropFilter:"blur(24px)" }}>

                  <MobileStepBar current={step}/>

                  {/* Step header */}
                  <div className="mb-7">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-accent-violet">Step {step} of 5</span>
                    </div>
                    <h2 className="font-display font-black text-2xl text-white tracking-tight">{stepTitle}</h2>
                    <p className="text-xs text-zinc-600 mt-0.5">{stepSub}</p>
                  </div>

                  {/* Step content */}
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div key={step} custom={dir} variants={slideV}
                      initial="enter" animate="center" exit="exit"
                      transition={{duration:0.3,ease:[0.32,0.72,0,1]}}>
                      {step===1 && <Step1 d={form} s={setForm}/>}
                      {step===2 && <Step2 d={form} s={setForm}/>}
                      {step===3 && <Step3 d={form} s={setForm}/>}
                      {step===4 && <Step4 d={form} s={setForm}/>}
                      {step===5 && <Step5 form={form} onPaymentSuccess={id=>{setRegId(id);setSubmitted(true);}}/>}
                    </motion.div>
                  </AnimatePresence>

                  {/* Nav buttons (not shown on step 5 which has its own Pay button) */}
                  {step < 5 && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/6">
                      <button type="button" onClick={goBack} disabled={step===1}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-500 hover:text-white border border-white/8 hover:border-white/20 transition-all disabled:opacity-20 disabled:pointer-events-none">
                        <ArrowLeft size={13}/> Back
                      </button>

                      {/* Progress dots */}
                      <div className="flex gap-1.5">
                        {STEPS.map(s=>(
                          <div key={s.id} className={`rounded-full transition-all duration-400 ${
                            s.id===step ? "w-5 h-1.5 bg-accent-violet" :
                            s.id<step   ? "w-1.5 h-1.5 bg-accent-cyan" :
                                          "w-1.5 h-1.5 bg-white/12"}`}/>
                        ))}
                      </div>

                      <button type="button" onClick={goNext} disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-25 disabled:pointer-events-none active:scale-95"
                        style={{
                          background: canProceed()?"linear-gradient(135deg,#8b5cf6,#06b6d4)":"rgba(255,255,255,0.05)",
                          boxShadow: canProceed()?"0 0 20px rgba(139,92,246,0.35)":"none",
                        }}>
                        {step===4 ? "Review Payment" : "Continue"} <ArrowRight size={13}/>
                      </button>
                    </div>
                  )}

                  {step===5 && (
                    <div className="mt-8 pt-6 border-t border-white/6 flex justify-start">
                      <button type="button" onClick={goBack}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-500 hover:text-white border border-white/8 hover:border-white/20 transition-all">
                        <ArrowLeft size={13}/> Back
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer note */}
              <p className="text-center text-[11px] text-zinc-700 mt-5">
                Questions? <a href="mailto:utkarsh@pesiams.ac.in" className="text-zinc-500 hover:text-accent-cyan transition-colors">utkarsh@pesiams.ac.in</a>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
