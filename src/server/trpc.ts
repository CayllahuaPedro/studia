import {initTRPC} from "@trpc/server";
import superjson from "superjson";
import {ZodError} from 'zod';
 
export const createTRPCContext = async (opts: {headers: Headers}) => {
  return {
    headers: opts.headers
  };
};

// initialize tRPC

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson, 
    errorFormatter({shape, error}){
        return {
            ...shape, 
            data: {
                ...shape.data,
                ZodError: error.cause instanceof ZodError ? error.cause.flatten() : null
            }
        }
    }
});

export const router = t.router;
export const publicProcedure= t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;