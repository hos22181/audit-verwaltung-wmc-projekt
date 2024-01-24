import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Audit from './collections/Audit'
import Law from './collections/Law'
import Question from './collections/Question'

export default buildConfig({
  cors: '*',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },      
  editor: slateEditor({}),
  collections: [Users, Audit, Question, Law],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
