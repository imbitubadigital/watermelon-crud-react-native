import {appSchema} from '@nozbe/watermelondb'
import { skillSchema } from './skills.schema'


export const schemas = appSchema({
  version: 1,
  tables: [ skillSchema ]
})

