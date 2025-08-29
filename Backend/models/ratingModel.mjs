import { sql } from "../dbConnection.mjs";


export const addRatingM = async (newRating) => {
  const columns = Object.keys(newRating);

  const [item] = await sql`
    insert into ratings ${sql(newRating, columns)}
    returning *
  `;

  return item;
};