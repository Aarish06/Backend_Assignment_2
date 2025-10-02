import { Branch } from "../models/branchModel";
import { branches as seedBranches } from "../../../data/branches";

let branches: Branch[] = [...seedBranches];
let currentId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;

export const branchService = {
  create: (data: Omit<Branch, "id">): Branch => {
    const branch = { id: currentId++, ...data };
    branches.push(branch);
    return branch;
  },

  getAll: (): Branch[] => branches,

  getById: (id: number): Branch | undefined =>
    branches.find(b => b.id === id),

  update: (id: number, data: Partial<Branch>): Branch | null => {
    const branch = branches.find(b => b.id === id);
    if (!branch) return null;
    Object.assign(branch, data);
    return branch;
  },

  delete: (id: number): boolean => {
    const index = branches.findIndex(b => b.id === id);
    if (index < 0) return false;
    branches.splice(index, 1);
    return true;
  },

  reset: (): void => {
    branches = [];
    currentId = 1;
  },
};