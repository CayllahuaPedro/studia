import {pgTable, varchar, pgSchema} from 'drizzle-orm/pg-core'
import { columnId, createdAt, updatedAt } from './utils'  

export const users = pgTable('users', {
    id: columnId,
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    createdAt,
    updatedAt
})