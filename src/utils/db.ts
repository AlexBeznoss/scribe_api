import { createClient  } from "@libsql/client";
import type { Client, ResultSet, Row, InArgs } from '@libsql/client';

const PAGINATION_LIMIT = 10;
export function dbConnection() : Client {
  return createClient({
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_TOKEN
  })
}

type PaginatedResult = {
  rows: Row[],
  hasNext: boolean
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
  },

  paginated: async (table: string, columns: string[], page: string | number): Promise<PaginatedResult> => {
    const limit = PAGINATION_LIMIT + 1;
    const offset = (Number(page) - 1) * PAGINATION_LIMIT;
    const sql = `select ${columns.join(', ')} from ${table} order by created_at DESC limit ${limit} offset ${offset}`;
    const res: ResultSet = await dbConnection().execute(sql);

    return {
      rows: res.rows.slice(0, PAGINATION_LIMIT - 2),
      hasNext: res.rows.length === PAGINATION_LIMIT + 1
    }
  }

}
