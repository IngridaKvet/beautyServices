import { sql } from "../dbConnection.mjs";

// Get all items
export const getDatesByIdM = async (id) => {
  const itemList = await sql`
    SELECT date FROM avail_dates
    WHERE procedure_id = ${id}
    `;

  return itemList;
};
