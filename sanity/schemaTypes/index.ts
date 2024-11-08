import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { blog } from "./blog";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, blog, playlist],
};
