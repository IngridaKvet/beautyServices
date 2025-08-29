import { sql } from "../dbConnection.mjs";

// Get all items
export const getAllItemsM = async () => {
  const itemList = await sql`
    SELECT * FROM items
    `;

  return itemList;
};

// Get item by id
export const getItemByIdM = async (id) => {
  const item = await sql`
    SELECT * FROM public.items
    WHERE id = ${id}
    `;

  return item;
};

// Post item
export const addItemM = async (newItem) => {
  const columns = Object.keys(newItem);

  const [item] = await sql`
    insert into items ${sql(newItem, columns)}
    returning *
  `;

  return item;
};

// Patch item
export const updateItemM = async (id, newItem) => {
  const columns = Object.keys(newItem);
  const [item] = await sql`
  update items set ${sql(newItem, columns)}
  where items.id = ${id}
  returning *
`;
  return item;
};

// Delete item
export const deleteItemM = async (id) => {
  const [item] = await sql`
delete from items
where items.id = ${id}
returning *
`;
  return item;
};
