import { IDatabaseAdapter } from "@src/database/connection.js";

export const name = "invoices";

export const restrictedFields = [];

const isExists = async (db: IDatabaseAdapter) => {
  const collections = (await db.listCollections()) as [];
  return collections.some(function (el: any) {
    return el.name === name;
  });
};

export async function createCollection(db: IDatabaseAdapter) {
  try {
    if (!(await isExists(db))) {
      await db.createCollection(name);
    }

    await db.updateSchema(name, {
      bsonType: "object",
      required: ["customer_id", "total"],
      properties: {
        createdAt: {
          bsonType: "date",
          description: "must be a date and is required",
        },
        updatedAt: {
          bsonType: "date",
          description: "must be a date and is required",
        },
        customer_id: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        total: {
          bsonType: "number",
          description: "must be a number and is required",
        },
      },
    });
    await db.createIndex(
      name,
      { customer_id: -1 },
      {
        unique: true,
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function dropCollection(db: IDatabaseAdapter) {
  try {
    if (await isExists(db)) {
      await db.dropCollection(name);
    }
  } catch (error) {
    throw error;
  }
}
