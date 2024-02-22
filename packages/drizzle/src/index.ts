import * as schema from "./schema";
import {drizzle} from "drizzle-orm/pg-proxy";
import {httpDriver} from "./http-proxy";

export const db = drizzle(httpDriver, {schema, logger: true});
