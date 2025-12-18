import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const applicationSchema = z.object({
    role: z.string().min(1),
    fullName: z.string().min(2),
    email: z.string().email(),
    telegram: z.string().min(2),
    location: z.string().min(2),
    experience: z.string().min(5),
    portfolio: z.string().min(2),
    motivation: z.string().min(5),
  });

  app.post(
    "/api/jobs/apply",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = applicationSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({
            message: "Invalid application data",
            issues: parsed.error.flatten().fieldErrors,
          });
        }

        const { role, fullName, email, telegram, location, experience, portfolio, motivation } =
          parsed.data;

        const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
          return res.status(500).json({
            message: "Telegram bot credentials are not configured",
          });
        }

        const message = [
          "📨 New job application",
          `Role: ${role}`,
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Telegram: ${telegram}`,
          `Location: ${location}`,
          `Portfolio: ${portfolio}`,
          "",
          "Experience:",
          experience,
          "",
          "Motivation:",
          motivation,
        ].join("\n");

        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: message,
            }),
          },
        );

        if (!telegramResponse.ok) {
          const data = await telegramResponse.json().catch(() => ({}));
          return res.status(502).json({
            message: "Failed to deliver application to Telegram",
            details: data,
          });
        }

        return res.status(201).json({ message: "Application sent to bot" });
      } catch (error) {
        next(error);
      }
    },
  );

  return httpServer;
}
