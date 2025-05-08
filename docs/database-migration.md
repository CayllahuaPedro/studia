# Database Migration: VARCHAR to UUID

This document outlines the process of migrating the Studia database from VARCHAR IDs to UUID IDs.

## Background

Initially, the database schema used VARCHAR type for ID columns with nanoid generation. The decision was made to migrate to UUID type for better compatibility and standardization.

## Issues Encountered

During the migration process, we encountered several issues:

1. **Type Mismatch Error**: When trying to use `pnpm db:push` with the updated schema, we received the error:
   ```
   error: foreign key constraint "files_workspace_id_workspaces_id_fk" cannot be implemented
   ```
   This occurred because the foreign key columns were defined as UUID type but were referencing VARCHAR columns.

2. **Column Type Conversion Error**: When attempting to modify the schema, we received:
   ```
   error: column "id" cannot be cast automatically to type uuid
   ```
   PostgreSQL cannot automatically convert VARCHAR to UUID without explicit casting.

## Solution: Database Recreation

Since the application was in early development without critical data, we opted for a complete database recreation:

1. **Stop and Remove the PostgreSQL Container**:
   ```bash
   docker-compose down
   ```

2. **Remove the Database Volume**:
   ```bash
   docker volume rm studia_postgres_data
   ```

3. **Start a Fresh PostgreSQL Container**:
   ```bash
   docker-compose up -d
   ```

4. **Apply the Updated Schema**:
   ```bash
   pnpm db:push
   ```

## Schema Changes

The following changes were made to the schema:

1. **In `utils.ts`**:
   ```typescript
   // Changed from
   export const columnId = varchar("id", { length: 255 })
     .notNull()
     .primaryKey()
     .$default(() => nanoid());

   // To
   export const columnId = uuid("id")
     .notNull()
     .primaryKey();
   ```

2. **In `schema.ts`**:
   - Updated all ID columns to use the `columnId` utility (UUID type)
   - Changed all foreign key references to use UUID type
   - Ensured proper relation definitions between tables

## Alternative Approach: In-Place Migration

For production databases with existing data, an in-place migration would be required:

```sql
-- Create temporary UUID columns
ALTER TABLE users ADD COLUMN temp_id UUID;
ALTER TABLE workspaces ADD COLUMN temp_id UUID;
-- etc.

-- Convert existing IDs to UUID
UPDATE users SET temp_id = id::UUID;
UPDATE workspaces SET temp_id = id::UUID;
-- etc.

-- Drop foreign key constraints
ALTER TABLE folders DROP CONSTRAINT IF EXISTS folders_workspace_id_workspaces_id_fk;
-- etc.

-- Replace old columns with new UUID columns
ALTER TABLE users DROP COLUMN id CASCADE;
ALTER TABLE users RENAME COLUMN temp_id TO id;
ALTER TABLE users ADD PRIMARY KEY (id);
-- etc.

-- Recreate foreign key constraints
ALTER TABLE folders ADD CONSTRAINT folders_workspace_id_workspaces_id_fk
FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE;
-- etc.
```

## Benefits of UUID

- **Globally Unique**: UUIDs are globally unique, reducing the chance of ID collisions
- **Security**: UUIDs don't expose sequential information about records
- **Distribution**: Better for distributed systems where IDs might be generated on different servers
- **Standard Format**: Widely recognized and supported format across different systems

## Drizzle Studio Compatibility

This migration also resolved issues with Drizzle Studio, which was previously showing errors related to relation inference:

```
Error: There is not enough information to infer relation "__public__.workspaces.folders"
```

The proper relation definitions and consistent column types resolved these issues.
