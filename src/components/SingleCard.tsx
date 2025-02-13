import React from "react";
import Form from "./Form";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignedIn, useAuth } from "@clerk/nextjs";

function SingleCard() {
    const createPost = useMutation(api.tasks.createTask);
    const { userId } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const form = e.target as HTMLFormElement;

        try {
            await createPost({
                URI: formData.get("link") as string,
                title: formData.get("title") as string,
                like: 0,
                users: userId ?? "annonomyus",
            });
            form.reset();
            console.log("submit success");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <SignedIn>
                <Form handleButton={handleSubmit} />
            </SignedIn>
        </>
    );
}

export default SingleCard;
