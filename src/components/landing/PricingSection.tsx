"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AI thumbnails",
    features: [
      "5 thumbnail generations/month",
      "Basic styles",
      "720p export",
      "Basic editor",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-white/5 to-white/[0.02]",
    border: "border-white/10",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious YouTube creators",
    features: [
      "100 thumbnail generations/month",
      "All 5 styles",
      "HD 1280x720 export",
      "Advanced editor with effects",
      "Background removal",
      "Priority generation",
      "Email support",
    ],
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-neon-purple/10 to-neon-blue/10",
    border: "border-neon-purple/30",
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "For teams and agencies",
    features: [
      "Unlimited generations",
      "All styles + custom styles",
      "4K export",
      "Full editor suite",
      "API access",
      "Team collaboration",
      "Priority support",
      "Custom branding",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-white/5 to-white/[0.02]",
    border: "border-white/10",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/10 rounded-full blur-[200px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your content creation needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border ${plan.border} bg-gradient-to-b ${plan.gradient} backdrop-blur-xl p-8 ${plan.popular ? "ring-1 ring-neon-purple/50 scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white text-xs font-semibold">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-white/40 text-sm mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-neon-purple mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.popular && <Sparkles className="h-4 w-4 mr-2" />}
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
