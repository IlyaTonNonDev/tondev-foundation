import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import characterTon from "@assets/character-ton.jpg";

type Job = {
  id: string;
  title: string;
  track: string;
  seniority: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
};

const jobs: Job[] = [
  {
    id: "director-of-memes",
    title: "Director of Memes",
    track: "Marketing · Creative",
    seniority: "Head",
    location: "Remote / Hubs",
    summary:
      "Own our meme machine: narrative, drop calendar, and cross-channel virality with a builder-first TON voice.",
    responsibilities: [
      "Design and run the TONDEV meme strategy across Telegram, X, and collabs.",
      "Ship creative sprints: briefs, fast drafts, and A/B tests to lift CTR and shares.",
      "Translate product drops and community moments into visual stories and micro-formats.",
      "Set the quality bar: templates, brand guardrails, and a smooth feedback loop with designers.",
      "Monitor performance weekly, double-down on winning formats, sunset the rest fast.",
    ],
    requirements: [
      "Portfolio of viral meme/content hits (crypto/web3 preferred).",
      "Hands-on in Figma/Photoshop/short-form editors; can jump in and fix assets yourself.",
      "Understands Telegram/X dynamics, TONs, and timing for hype cycles.",
      "Comfort working with product + data to pick the next meme bets.",
      "English & Russian to drive bilingual execution.",
    ],
    perks: [
      "Direct line to the founders and instant feedback cycles.",
      "Budget for design tools, plugins, and creative experiments.",
      "Remote-first with coworking access in Yerevan, Belgrade, London, Dubai.",
    ],
  },
  {
    id: "director-of-pump",
    title: "Director of Pump",
    track: "Growth · Token",
    seniority: "Head",
    location: "Remote / Hubs",
    summary:
      "Lead growth loops, liquidity storytelling, and GTM experiments that keep $TONDEV top-of-mind.",
    responsibilities: [
      "Define north-star metrics, weekly dashboards, and alerting for growth and liquidity health.",
      "Plan and execute growth campaigns with partners, KOLs, and product squads.",
      "Model scenarios with data/BI to prioritize the next pumps, rallies, and retention plays.",
      "Coordinate with trading ops/community to keep spreads, depth, and comms aligned.",
      "Package narratives for listings, AMAs, and ecosystem pushes with crisp copy.",
    ],
    requirements: [
      "Track record running growth/performance in crypto, fintech, or trading products.",
      "Deep analytics comfort (SQL/ClickHouse or Python is a plus) and experiment design.",
      "Understands token liquidity mechanics, treasury guardrails, and comms timing.",
      "Exec-ready communication; can defend a plan with numbers and risk scenarios.",
      "English & Russian for cross-team coordination.",
    ],
    perks: [
      "Ownership of growth roadmap with fast approvals and low bureaucracy.",
      "Access to data engineers/analysts to validate hypotheses quickly.",
      "Health coverage support and hardware budget.",
    ],
  },
  {
    id: "director-of-dump",
    title: "Director of Dump",
    track: "Risk · Comms",
    seniority: "Head",
    location: "Remote / Hubs",
    summary:
      "Be the calm in market chaos: own downside playbooks, incident comms, and keep community trust intact.",
    responsibilities: [
      "Build crisis and “dump” playbooks: monitoring, thresholds, and who-pings-whom.",
      "Lead post-mortems for incidents; ship action items with owners and deadlines.",
      "Draft rapid comms for TG/X/site to keep the community informed and confident.",
      "Partner with compliance/security to spot fraud patterns and front-run FUD.",
      "Run tabletop drills so the team can move in minutes, not hours.",
    ],
    requirements: [
      "Experience in risk, comms, or ops in high-volatility products (crypto ideal).",
      "Excellent written comms; can simplify complex events into clear updates.",
      "Understands on-chain signals, bot detection basics, and alerting tools.",
      "Can coordinate execs, mods, and analysts under pressure without drama.",
      "Bilingual (English/Russian) for 24/7 community coverage.",
    ],
    perks: [
      "Authority to define runbooks and tooling you actually trust.",
      "Time-off and wellness support after heavy incident cycles.",
      "Remote-first with optional hub meetups and offsites.",
    ],
  },
];

type ApplicationFormState = {
  fullName: string;
  email: string;
  telegram: string;
  location: string;
  experience: string;
  portfolio: string;
  motivation: string;
};

const initialFormState: ApplicationFormState = {
  fullName: "",
  email: "",
  telegram: "",
  location: "",
  experience: "",
  portfolio: "",
  motivation: "",
};

function FasterReplyIllustration(props: { className?: string }) {
  const { className } = props;
  return (
    <img
      src={characterTon}
      alt="Character with TON coin"
      className={className}
    />
  );
}

export default function JobsPage() {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<Job["id"]>(jobs[0].id);
  const [formState, setFormState] = useState<ApplicationFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedRole) ?? jobs[0],
    [selectedRole],
  );

  const updateField = (field: keyof ApplicationFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedRole,
          ...formState,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to submit the application");
      }

      toast({
        title: "Sent",
        description: "Application delivered to our Telegram bot.",
      });
      setFormState(initialFormState);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Please retry or check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
    requestAnimationFrame(() => {
      document.getElementById("job-apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <section className="border-b-2 border-black bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-mono text-white">
              <Sparkles className="h-4 w-4" />
              We’re hiring
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Start building the TONDEV future with us
            </h1>
            <p className="text-lg font-mono text-muted-foreground">
              Three roles, one goal: speed up $TONDEV. Apply and we will reply within 7 business days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-accent text-black">Remote first</Badge>
              <Badge className="bg-primary text-primary-foreground">English + Russian</Badge>
              <Badge variant="outline" className="border-black">Telegram-native</Badge>
            </div>
          </div>
          <div className="sketch-border bg-white p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-3">Want curated job alerts?</h3>
            <p className="font-mono text-sm text-muted-foreground mb-4">
              Drop your details — even if a role is closed, we’ll shortlist you and reach out when a slot opens.
            </p>
            <Button className="w-full sketch-border bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleSelectRole(selectedRole)}>
              Create job alert
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-black">
        <div className="container mx-auto px-4 space-y-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-sm text-muted-foreground">Open roles</p>
              <h2 className="text-3xl md:text-4xl font-bold">3 positions live</h2>
            </div>
            <a
              className="inline-flex items-center gap-2 text-primary font-bold"
              href="https://t.me/tondev_jetton"
              target="_blank"
              rel="noreferrer"
            >
              Ask in Telegram
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6">
            {jobs.map((job) => (
              <motion.article
                key={job.id}
                className="sketch-border bg-white p-6 md:p-8 flex flex-col gap-4 overflow-hidden max-w-full w-full"
                whileHover={{ translateY: -4 }}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {job.track}
                    </p>
                    <h3 className="text-2xl font-bold">{job.title}</h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      {job.seniority} · {job.location}
                    </p>
                    <p className="font-mono text-sm text-foreground/80 w-full break-words whitespace-normal hyphens-auto leading-relaxed">
                      {job.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-black">Full-time</Badge>
                    <Badge variant="outline" className="border-black">Remote</Badge>
                    <Badge variant="outline" className="border-black">{job.seniority}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-2">
                    <h4 className="font-bold">Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-muted-foreground break-words leading-relaxed whitespace-pre-line">
                      {job.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 font-mono text-sm text-muted-foreground break-words leading-relaxed whitespace-pre-line">
                      {job.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-2 break-words">
                    {job.perks.map((perk) => (
                      <Badge key={perk} variant="secondary" className="border border-black">
                        {perk}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant={selectedRole === job.id ? "default" : "secondary"}
                      className="sketch-border"
                      onClick={() => handleSelectRole(job.id)}
                    >
                      {selectedRole === job.id ? "Selected" : "Apply"}
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="job-apply-form" className="py-16 border-b-2 border-black bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8 sketch-border bg-white p-6 md:p-8">
            <div className="space-y-2">
              <p className="font-mono text-sm text-muted-foreground">
                Application form · same fields for every vacancy
              </p>
              <h3 className="text-3xl font-bold">Tell us about you</h3>
              <p className="font-mono text-sm">
                Selected role: <span className="font-bold">{selectedJob.title}</span>
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                All applications go to our Telegram bot. We reply within 7 business days.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="font-mono text-sm">Role</span>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full rounded-md border-2 border-black bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-primary/40"
                  >
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="font-mono text-sm">Full name</span>
                  <Input
                    required
                    value={formState.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Satoshi Dev"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="font-mono text-sm">Email</span>
                  <Input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@ton.dev"
                  />
                </label>
                <label className="space-y-2">
                  <span className="font-mono text-sm">Telegram @handle</span>
                  <Input
                    required
                    value={formState.telegram}
                    onChange={(e) => updateField("telegram", e.target.value)}
                    placeholder="@tondev"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="font-mono text-sm">Location / Timezone</span>
                  <Input
                    required
                    value={formState.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Dubai · GMT+4"
                  />
                </label>
                <label className="space-y-2">
                  <span className="font-mono text-sm">Portfolio / CV link</span>
                  <Input
                    required
                    value={formState.portfolio}
                    onChange={(e) => updateField("portfolio", e.target.value)}
                    placeholder="https://linktr.ee/you"
                  />
                </label>
              </div>

              <label className="space-y-2">
                <span className="font-mono text-sm">Relevant experience</span>
                <Textarea
                  required
                  value={formState.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="3-5 bullets: teams, metrics you moved, stack/tools."
                  className="min-h-[120px]"
                />
              </label>

              <label className="space-y-2">
                <span className="font-mono text-sm">Why TONDEV? (short pitch)</span>
                <Textarea
                  required
                  value={formState.motivation}
                  onChange={(e) => updateField("motivation", e.target.value)}
                  placeholder="What you’ll ship in the first 30-60 days."
                  className="min-h-[100px]"
                />
              </label>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="font-mono text-xs text-muted-foreground">
                  By sending, you agree to receive a reply in Telegram and email.
                </p>
                <Button
                  type="submit"
                  className="sketch-border bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send to bot
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2">
          <div className="sketch-border bg-white p-6 space-y-3">
            <h4 className="text-xl font-bold">FAQ</h4>
            <div className="space-y-2">
              <p className="font-mono text-sm text-muted-foreground">Can I apply without a specific role?</p>
              <p className="font-mono text-sm"><strong>Yes — choose any role and mention “General” in the pitch.</strong></p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm text-muted-foreground">When will you reply?</p>
              <p className="font-mono text-sm"><strong>We reply within 7 business days. Urgent cases get a Telegram ping faster.</strong></p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm text-muted-foreground">Is remote okay?</p>
              <p className="font-mono text-sm"><strong>Yes. We also have hubs in Yerevan, Belgrade, London, and Dubai.</strong></p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-sm text-muted-foreground">Internships?</p>
              <p className="font-mono text-sm"><strong>No internships right now, but we keep promising profiles on file.</strong></p>
            </div>
          </div>

          <div className="sketch-border bg-[#9b59d0] text-white p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start md:justify-between">
              <div className="space-y-3 flex-1 text-center md:text-left">
                <h4 className="text-2xl md:text-3xl font-bold">Want faster reply?</h4>
                <p className="font-mono text-sm md:text-base">
                  Ping us PM — we can follow up quicker in Telegram if it is urgent.
                </p>
              </div>
              <motion.div
                className="flex-shrink-0"
                whileHover={{ rotate: -1, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <FasterReplyIllustration className="h-40 w-auto md:h-48" />
              </motion.div>
            </div>
            <Button
              asChild
              variant="secondary"
              className="sketch-border bg-white text-black hover:bg-gray-100 w-full md:w-auto font-bold"
            >
              <a href="https://t.me/tondev_jetton" target="_blank" rel="noreferrer">
                Ping us in Telegram
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

