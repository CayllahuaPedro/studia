import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const columnId = varchar("id", { length: 255 })
  .notNull()
  .primaryKey()
  .$default(() => nanoid());

export const createdAt =  timestamp('created_at', {
  withTimezone: true,
  mode: 'string',
})
  .defaultNow()
  .notNull()

export const updatedAt = timestamp("updated_at", {
  withTimezone: true,
  mode: 'string',
})
  .defaultNow()
