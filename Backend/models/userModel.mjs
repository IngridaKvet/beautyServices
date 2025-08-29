import { sql } from "../dbConnection.mjs";

//1. Register
export const createUser = async (newUser) => {

const [user] = await sql`
    INSERT INTO users ${sql(newUser, 'username', 'email', 'password')}
    RETURNING *
  `;


  return user;
};

// 2. View user by email
export const getUserByEmailM = async (email) => {
  const [existingUser] = await sql`
        SELECT * FROM users
        WHERE email = ${email}
        `;
  return existingUser;
};

// 3. Get user by ID
export const getUserByIdM = async (id) => {
    const [existingUser] = await sql`
          SELECT * FROM users
          WHERE id = ${id}
          `;
    return existingUser;
  };


// 4. Update user
export const updateUserM = async (id, newUser) => {
  const columns = Object.keys(newUser);
  const [user] = await sql`
  update users set ${sql(newUser, columns)}
  where users.id = ${id}
  returning *
`;
  return user;
};
