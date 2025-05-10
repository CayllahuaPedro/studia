import { z } from 'zod';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env' });

// Esquema para validar variables de entorno
const envSchema = z.object({
  // Variables para base de datos local (Docker)
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default('postgres'),
  DATABASE_NAME: z.string().default('studia'),
  
  // Variables para Supabase
  SUPABASE_URL: z.string().url().optional(),
  DATABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_PASSWORD: z.string().optional(),
  
  // Proveedor de base de datos
  DATABASE_PROVIDER: z.enum(['local', 'supabase']).default('local'),
});

// Función para validar y obtener las variables de entorno tipadas
export const env = envSchema.parse(process.env);

// Tipo inferido del esquema
export type Env = z.infer<typeof envSchema>;

// Exportar variables individuales para facilitar su uso
export const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  SUPABASE_URL,
  DATABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_PASSWORD,
  DATABASE_PROVIDER,
} = env;
