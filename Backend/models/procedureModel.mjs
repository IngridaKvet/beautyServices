import { sql } from "../dbConnection.mjs";

// Get all items
export const getAllProceduresM = async () => {
  const itemList = await sql`
    SELECT 
      procedures.*,
      categories.name AS category,
      ARRAY_AGG(DISTINCT avail_dates.date ORDER BY avail_dates.date) AS avail_dates,
      ROUND(AVG(ratings.rating), 1) AS average_rating
    FROM procedures
    JOIN categories 
      ON procedures.category_id = categories.id
    LEFT JOIN avail_dates 
      ON procedures.id = avail_dates.procedure_id
    LEFT JOIN ratings
      ON procedures.id = ratings.procedure_id
    GROUP BY procedures.id, categories.name;


    `;

  return itemList;
};


export const addProcedureM = async (newItem) => {
  const columns = Object.keys(newItem);

  const [item] = await sql`
    insert into procedures ${sql(newItem, columns)}
    returning *
  `;

  return item;
};

// Patch item
export const updateProcedureM = async (id, newItem) => {
  const columns = Object.keys(newItem);
  const [item] = await sql`
  update procedures set ${sql(newItem, columns)}
  where procedures.id = ${id}
  returning *
`;
  return item;
};

// Delete item
export const deleteProcedureM = async (id) => {
  const [item] = await sql`
delete from procedures
where procedures.id = ${id}
returning *
`;
  return item;
};
