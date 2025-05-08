import {pgTable, varchar, pgSchema, uuid, text} from 'drizzle-orm/pg-core'
import { columnId, createdAt, updatedAt } from './utils'  
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
    id: columnId,
    name: varchar('name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    createdAt,
    updatedAt
})


export const workspaces = pgTable('workspaces', {
    id: columnId,
    createdAt: createdAt,
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),
  });
  
  export const workspacesRelations= relations(workspaces, ({many}) => ({
    folders: many(folders)
  }))

  export const folders = pgTable('folders', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: createdAt,
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    bannerUrl: text('banner_url'),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, {
        onDelete: 'cascade',
      }),
  });


  export const files = pgTable('files', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: createdAt,
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('data'),
    inTrash: text('in_trash'),
    bannerUrl: text('banner_url'),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, {
        onDelete: 'cascade',
      }),
    folderId: uuid('folder_id')
      .notNull()
      .references(() => folders.id, {
        onDelete: 'cascade',
      }),
  });