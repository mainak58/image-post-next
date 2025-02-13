"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export default function Page() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results?.map((post) => (
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
                        />
                        <div className="p-6 space-y-4">
                            <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
                                {post.title}
                            </CardTitle>
                            <p className="text-indigo-600 font-semibold flex items-center gap-2">
                                <p className="w-5 h-5" /> {post.like} likes
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            {isLoading && (
                <div className="text-center py-8 animate-pulse">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full">
                        Loading more items...
                    </div>
                </div>
            )}
        </div>
    );
}
