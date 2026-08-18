import { sqliteAdapter } from '@payloadcms/db-sqlite';
import path from 'node:path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'node:url';

import { Media } from './src/payload/collections/Media';
import { News } from './src/payload/collections/News';
import { Users } from './src/payload/collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, News],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'development-payload-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
  },
});
