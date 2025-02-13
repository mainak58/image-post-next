"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Card, CardImage, CardTitle } from "@/components/ui/card";
import { Id } from "../../../../convex/_generated/dataModel";

function Page() {
    const params = useParams();
    const taskId = params.id as Id<"posts">;
    const task = useQuery(api.tasks.getTask, { taskId });

    if (!task) {
        return <div>Loading...</div>;
    }
    const handleDownload = async () => {
        const response = await fetch(task.URI);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${task.title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="p-6 space-y-6">
                    <CardTitle className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
                        {task.title}
                    </CardTitle>

                    <div className="overflow-hidden rounded-xl">
                        <CardImage
                            src={task.URI}
                            height={600}
                            width={800}
                            imageName="card"
                            className="w-full h-[600px] object-contain bg-gray-100 hover:scale-[1.02] transition-transform duration-500 ease-in-out"
                            alt={task.title}
                        />
                    </div>
                </div>
                <button
                    onClick={handleDownload}
                    className="p-3 m-3 h-10 w-1/5 flex justify-center items-center bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 font-medium"
                >
                    Download Image
                </button>
            </Card>
        </div>
    );
}

export default Page;
