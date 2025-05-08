import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = router({
  getAll: publicProcedure.query(async () => {
    
    const users = await db.query.users.findMany();
    if(!users) throw new Error("No se pudieron obtener los usuarios")
    return users;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      
      const foundUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, input.id),
      });
      if(!foundUser) throw new Error("No se pudo obtener el usuario")
      return foundUser;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Verificar si el email ya existe
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email));

        if (existingUser.length > 0) {
          throw new Error("El correo electrónico ya está en uso");
        }

        const result = await db
          .insert(users)
          .values(input)
          .returning();

        return result[0];
      } catch (error) {
        console.error("Error al crear usuario:", error);

        // Propagar un mensaje de error más específico
        if (error instanceof Error) {
          if (
            error.message.includes("duplicate key") ||
            error.message === "El correo electrónico ya está en uso"
          ) {
            throw new Error("El correo electrónico ya está en uso");
          }
        }

        throw new Error("No se pudo crear el usuario");
      }
    }),
});
