import React from "react";

interface FormProps {
    handleButton: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ handleButton }: FormProps) {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleButton} className="flex items-center gap-4">
                <input
                    type="text"
                    id="link"
                    name="link"
                    className="flex-1 px-4 py-2 rounded-lg border border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Enter link"
                />
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="flex-1 px-4 py-2 rounded-lg border border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Enter body"
                />
                <button
                    type="submit"
                    className="bg-violet-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-violet-700 focus:ring-4 focus:ring-violet-500/50 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
