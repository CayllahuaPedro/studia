import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { db } from '@/db';
import { users } from '@/db/schema';
import {eq} from "drizzle-orm"

export const usersRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),
  
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db.select().from(users).where(eq(users.id, input.id));
      return user[0];
    }),
  
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const result = await db.insert(users).values({
        name: input.name,
        email: input.email,
      }).returning();
      
      return result[0];
    }),
});