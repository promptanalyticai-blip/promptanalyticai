import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const automations = pgTable("automations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  workspaceId: varchar("workspace_id", { length: 36 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  trigger: varchar("trigger", { length: 100 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  conditions: text("conditions"),
  active: varchar("active", { length: 10 }).default("true"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const automationLogs = pgTable("automation_logs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  automationId: varchar("automation_id", { length: 36 }).notNull(),
  workspaceId: varchar("workspace_id", { length: 36 }).notNull(),
  trigger: varchar("trigger", { length: 100 }).notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow(),
});
