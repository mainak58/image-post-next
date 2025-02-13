import { paginationOptsValidator } from "convex/server";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
    args: {
        URI: v.string(),
        title: v.string(),
        users: v.string(),
        like: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("posts", {
            URI: args.URI,
            title: args.title,
            users: args.users,
            like: args.like,
        });
    },
});

export const listTasks = query({
    handler: async (ctx) => {
        return await ctx.db.query("posts").collect();
    },
});

export const incrementLike = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        const { id } = args;
        const post = await ctx.db.get(id);

        if (!post) {
            throw new Error("Post not found");
        }

        await ctx.db.patch(id, { like: (post.like || 0) + 1 });

        return { success: true, newLikeCount: post.like + 1 };
    },
});

export const decrementLike = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
        const { id } = args;
        const post = await ctx.db.get(id);

        if (!post) {
            throw new Error("Post not found");
        }

        await ctx.db.patch(id, { like: (post.like || 0) - 1 });

        return { success: true, newLikeCount: post.like - 1 };
    },
});

export const list = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        const posts = await ctx.db
            .query("posts")
            .order("asc")
            .paginate(args.paginationOpts);
        return posts;
    },
});

export const getTask = query({
    args: { taskId: v.id("posts") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.taskId);
    },
});
