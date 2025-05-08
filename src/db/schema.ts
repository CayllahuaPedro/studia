import {pgTable, varchar, pgSchema, uuid, text} from 'drizzle-orm/pg-core'
import { columnId, createdAt, updatedAt } from './utils'  
import { relations } from 'drizzle-orm';
import { nanoid } from 'nanoid';

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
    workspaceOwner: varchar('workspace_owner', { length: 255 }).notNull(),
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
    id: columnId,
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

  export const foldersRelations = relations(folders, ({ one }) => ({
    workspace: one(workspaces, {
      fields: [folders.workspaceId],
      references: [workspaces.id],
    })
  }));

  export const files = pgTable('files', {
    id: columnId,
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

  export const filesRelations = relations(files, ({ one }) => ({
    workspace: one(workspaces, {
      fields: [files.workspaceId],
      references: [workspaces.id],
    }),
    folder: one(folders, {
      fields: [files.folderId],
      references: [folders.id],
    })
  }));