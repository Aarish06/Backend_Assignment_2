import { Branch } from "../models/branchModel";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

export const branchService = {
  // CREATE
  create: async (data: Omit<Branch, "id">): Promise<Branch> => {
    const id = await createDocument<Omit<Branch, "id">>(COLLECTION, data);
    const createdDoc = await getDocumentById(COLLECTION, id);

    if (!createdDoc || !createdDoc.exists) {
      throw new Error("Failed to retrieve created branch");
    }

    const createdData = createdDoc.data() as Omit<Branch, "id">;
    return { id: Number(id), ...createdData };
  },

  // GET ALL
  getAll: async (): Promise<Branch[]> => {
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Branch, "id">;
      return { id: Number(doc.id), ...data };
    });
  },

  // GET BY ID
  getById: async (id: string): Promise<Branch | null> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc || !doc.exists) return null;
    const data = doc.data() as Omit<Branch, "id">;
    return { id: Number(id), ...data };
  },

  // UPDATE
  update: async (id: string, data: Partial<Branch>): Promise<Branch | null> => {
    const existingDoc = await getDocumentById(COLLECTION, id);
    if (!existingDoc || !existingDoc.exists) return null;

    await updateDocument<Branch>(COLLECTION, id, data);
    const updatedDoc = await getDocumentById(COLLECTION, id);
    if (!updatedDoc || !updatedDoc.exists) return null;

    const updatedData = updatedDoc.data() as Omit<Branch, "id">;
    return { id: Number(id), ...updatedData };
  },

  // DELETE
  delete: async (id: string): Promise<boolean> => {
    const doc = await getDocumentById(COLLECTION, id);
    if (!doc || !doc.exists) return false;

    await deleteDocument(COLLECTION, id);
    return true;
  },
};
