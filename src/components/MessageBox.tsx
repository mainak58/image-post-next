"use client";

import React, { useEffect, useState } from "react";
import { Card, CardImage, CardTitle } from "./ui/card";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

function MessageBox() {
    const router = useRouter();
    const incrementLike = useMutation(api.tasks.incrementLike);
    const decrementLike = useMutation(api.tasks.decrementLike);

    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

    async function likeButton(postId: Id<"posts">) {
        try {
            await incrementLike({
                id: postId,
            });
            setLikedPosts((prev) => ({ ...prev, [postId]: true }));
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    }

    async function dislikeButton(postId: Id<"posts">) {
        try {
            await decrementLike({
                id: postId,
            });
            setLikedPosts((prev) => ({ ...prev, [postId]: false }));
        } catch (error) {
            console.error("Error disliking the post:", error);
        }
    }

    const { results, status, loadMore } = usePaginatedQuery(
        api.tasks.list,
        { paginationOpts: {} },
        { initialNumItems: 10 }
    );

    const isLoading = status === "LoadingMore";
    const hasMore = status !== "Exhausted";

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;

            if (
                scrollHeight - scrollTop - clientHeight < 100 &&
                hasMore &&
                !isLoading
            ) {
                loadMore(5);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, isLoading, loadMore]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {isLoading && <div>Loading...</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results?.map(
                    (post: {
                        _id: Id<"posts">;
                        URI: string;
                        title: string;
                        like: number;
                    }) => (
                        <Card
                            key={post._id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                        >
                            <CardImage
                                src={post.URI}
                                height={300}
                                width={300}
                                imageName="card"
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                                alt={post.title}
                            />
                            <div className="p-6 space-y-4">
                                <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
                                    {post.title}
                                </CardTitle>
                                <div className="flex items-center justify-between">
                                    {!likedPosts[post._id] ? (
                                        <button
                                            onClick={() => likeButton(post._id)}
                                            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300"
                                            aria-label="Like this post"
                                        >
                                            Like
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                dislikeButton(post._id)
                                            }
                                            className="bg-rose-600 text-white px-6 py-2 rounded-full font-medium hover:bg-rose-700 transition-colors duration-300"
                                            aria-label="Dislike this post"
                                        >
                                            Dislike
                                        </button>
                                    )}
                                    <p className="text-lg font-semibold text-gray-700">
                                        {post.like} likes
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        router.push(`/post/${post._id}`);
                                    }}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    Load
                                </button>
                            </div>
                        </Card>
                    )
                )}
            </div>
        </div>
    );
}

export default MessageBox;
