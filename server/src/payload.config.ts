import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Audit from './collections/Audit'
import Law from './collections/Law'
import Question from './collections/Question'
import Users from './collections/Users'

export default buildConfig({
  serverURL: 'http://localhost:3000',
  cors: ['http://localhost:5173'],
  csrf: ['http://localhost:5173'],
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
