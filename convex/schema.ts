import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    posts: defineTable({
        URI: v.string(),
        title: v.string(),
        users: v.string(),
        like: v.number(),
    }),
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
});
