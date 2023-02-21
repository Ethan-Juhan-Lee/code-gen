import { Resolvers } from '../__generated__/resolvers-types';
import mutations from './mutations.js';
import queries from './queries.js';

// Note this "Resolvers" type isn't strictly necessary because we are already
// separately type checking our queries and resolvers. However, the "Resolvers"
// generated types is useful syntax if you are defining your resolvers
// in a single file.
export const resolvers: Resolvers = { ...queries, ...mutations };
