import { Database } from '@nozbe/watermelondb';

import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas/index';
import { SkillModel } from './models/skill.model';

const adapter = new SQLiteAdapter({
  schema: schemas
})

export const DB = new Database({
  adapter,
  modelClasses: [ SkillModel]
})
