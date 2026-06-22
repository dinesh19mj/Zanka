"use client";

import { useState, useEffect } from "react";
import { FadeUp } from "../animations/FadeUp";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LimitedDrop() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set drop date to 3 days from now
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 3);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = dropDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-muted relative overflow-hidden flex flex-col md:flex-row border border-border">
          {/* Content */}
          <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10">
            <FadeUp>
              <div className="inline-block bg-accent text-white px-3 py-1 font-bold text-xs uppercase tracking-widest mb-6">
                Exclusive Drop
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight mb-4 text-black">
                The "Neon Genesis" Collection
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground mb-8 max-w-md">
                Only 100 pieces available globally. Once they're gone, they're gone forever. Don't miss your chance to own a piece of Zanka history.
              </p>
            </FadeUp>

            {/* Countdown */}
            <FadeUp delay={0.3}>
              <div className="flex gap-4 mb-8">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-black text-white w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl font-bold font-heading mb-1">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <Link 
                href="/drops/neon-genesis"
                className="inline-flex items-center justify-center bg-black text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors gap-2"
              >
                Set Reminder <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>

          {/* Image */}
          <div className="flex-1 relative min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop"
              alt="Limited Drop Item"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Stock indicator */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 flex items-center gap-3 border border-border">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-black">Only 100 Left</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
