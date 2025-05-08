ALTER TABLE "files" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "workspace_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "folder_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "workspace_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "workspace_owner" SET DATA TYPE varchar(255);