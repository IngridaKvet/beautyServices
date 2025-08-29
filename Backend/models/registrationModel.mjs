// Post item
import { sql } from "../dbConnection.mjs";

export const addRegistrationM = async (newItem) => {
  const columns = Object.keys(newItem);

  const [item] = await sql`
    insert into registrations ${sql(newItem, columns)}
    returning *
  `;

  return item;
};
