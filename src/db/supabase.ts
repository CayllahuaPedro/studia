import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/env';
import * as schema from './schema';
// Verificar que las variables de entorno necesarias estén definidas
if (!env.DATABASE_URL) {
  throw new Error('La variable de entorno DATABASE_URL es requerida para la conexión a Supabase');
}

// Cliente de Drizzle para Supabase
const client = postgres(env.DATABASE_URL)
export const supabaseDb = drizzle(client, {schema});
