"use client";

import React, { useState } from "react";
import { Card, CardContent, CardImage } from "./ui/card";
import useWallpaper from "@/hooks/Wallpaper";

function MessageBox() {
const wallpapers = useWallpaper();
const [wallpaper, setWallpaper] = useState(wallpapers);
const [url, setUrl] = useState("");

    function setImageUrl() {
        if (!url.trim()) return;
        setWallpaper((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                URL: url,
            },
        ]);
        setUrl("");
    }

    return (
        <>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter image URL"
                className="p-2 border rounded-md"
            />
            <button
                onClick={setImageUrl}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            >
                Add Image
            </button>

            <div className="w-full flex flex-col justify-center items-center">
                {wallpaper &&
                    wallpaper.map((wallpaper) => (
                        <Card
                            key={wallpaper.id}
                            className="h-96 w-2/5 flex flex-col justify-center items-center bg-orange-800"
                        >
                            <CardContent>Hello World</CardContent>
                            <CardImage
                                src={wallpaper.URL}
                                height={300}
                                width={300}
                                imageName="card"
                            />
                        </Card>
                    ))}
            </div>
        </>
    );

}

export default MessageBox;
