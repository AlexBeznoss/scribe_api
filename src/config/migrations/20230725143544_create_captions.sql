-- Create "captions" table
CREATE TABLE `captions` (`id` integer NOT NULL PRIMARY KEY AUTOINCREMENT, `status` varchar NOT NULL, `url` varchar NOT NULL, `title` varchar NULL, `data` text NULL, `created_at` datetime NOT NULL DEFAULT current_timestamp, `updated_at` datetime NOT NULL DEFAULT current_timestamp);
-- Create index "captions_url_idx" to table: "captions"
CREATE UNIQUE INDEX `captions_url_idx` ON `captions` (`url`);
