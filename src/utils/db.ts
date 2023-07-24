import { createClient  } from "@libsql/client";
import type { Client, ResultSet, Row, InArgs } from '@libsql/client';

export function dbConnection() : Client {
  return createClient({
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_TOKEN
  })
}

export const Repo = {
  find: async (table: string, id: string | number, columns: string[]): Promise<Row> => {
    const res: ResultSet = await dbConnection().execute({
      sql: `select ${columns.join(', ')} from ${table} where id = :id limit 1`,
      args: { id }
    });

    if (res.rows.length === 0) {
      throw `Record with id ${id} does not exists in ${table} table!`
    }

    return res.rows[0];
  },

  create: async (table: string, changeset: object): Promise<ResultSet> => {
    const columns = Object.keys(changeset);
    const columnKeys = columns.map((e) => `:${e}`);

    return await dbConnection().execute({
      sql: `insert into ${table} (${columns.join(', ')}) values (${columnKeys.join(', ')}) returning *`,
      args: changeset as InArgs
    })
  },

  update: async (table: string, id: string | number, changeset: object): Promise<ResultSet> => {
    const updates = Object.keys(changeset).map((k) => `${k} = :${k}`).join(', ');
    return await dbConnection().execute({
      sql: `update ${table} set ${updates} where id = :id returning *`,
      args: Object.assign(changeset, {id})
    })
  }

}
