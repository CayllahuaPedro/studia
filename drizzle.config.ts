import type { Config } from "drizzle-kit";
import { env } from "./src/env";

if(!env.DATABASE_URL){
  console.log('⛔ No se encontro url de base de datos')
}

// Configuración base para PostgreSQL local
const localConfig: Config = {
  schema: "./src/db/schema.ts",
  out: "./local/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    ssl: false
  },
};

// Configuración para Supabase
const supabaseConfig: Config = {
  schema: "./src/db/schema.ts",
  out: "./supabase/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
};

// Exportar la configuración según el proveedor seleccionado
export default (env.DATABASE_PROVIDER === 'supabase' ? supabaseConfig : localConfig);
