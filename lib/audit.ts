import { db } from "./drizzle";
import { auditLogs } from "./schema";
import { z } from "zod";

const auditSchema = z.object({
  userId: z.string().optional(),
  action: z.string(),
  entity: z.string().optional(),
  entityId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional()
});

export async function logAuditEvent(input: z.infer<typeof auditSchema>) {
  const data = auditSchema.parse(input);

  await db.insert(auditLogs).values({
    userId: data.userId ?? null,
    action: data.action,
    entity: data.entity ?? null,
    entityId: data.entityId ?? null,
    metadata: data.metadata ?? {},
    ip: data.ip ?? null,
    userAgent: data.userAgent ?? null
  });
}
