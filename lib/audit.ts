import { z } from "zod";

export const auditSchema = z.object({
  action: z.string(),
  entity: z.string().optional(),
  entityId: z.string().optional(),

  // Zod requiere DOS argumentos: tipo de clave y tipo de valor
  metadata: z.record(z.string(), z.any()).optional(),

  ip: z.string().optional(),
  userAgent: z.string().optional()
});

// Si tienes funciones que usan este schema, puedes agregarlas aquí.
// Por ejemplo, validar un payload antes de guardarlo:
export function validarAudit(data: unknown) {
  return auditSchema.parse(data);
}
