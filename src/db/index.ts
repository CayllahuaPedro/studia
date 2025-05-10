import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { supabaseDb } from './supabase';
import { env } from '@/env';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

// Definir el tipo de la base de datos
export type DrizzleDB = NodePgDatabase<typeof schema> | PostgresJsDatabase<typeof schema>;

// Determinar qué proveedor de base de datos usar
let db: DrizzleDB;

if (env.DATABASE_PROVIDER === 'supabase') {
  // Usar Supabase
  db = supabaseDb;
} else {
  // Configuración de la conexión a PostgreSQL local
  const pool = new Pool({
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    ssl: false
  });

  // Crear la instancia de Drizzle para PostgreSQL local
  db = drizzle(pool, { schema });
}

// Exportar la instancia de base de datos
export { db };