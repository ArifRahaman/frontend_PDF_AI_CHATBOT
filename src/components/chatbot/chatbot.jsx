


import React, { useState } from "react";
import axios from "axios";
import p2 from "./mp2.mp4";

const Chat = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    // console.log(import.meta.env.VITE_API_KEY)
    console.log(import.meta.env.VITE_API_KEY +" "+"A");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: newMessages,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                }
            );

            const assistantMessage = response.data.choices[0].message;
            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            console.error("Error fetching data from OpenAI API:", error);
        }
    };

    return (
        <div className="relative flex flex-col items-center p-4 min-h-screen">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src={p2} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
       
            <div className="relative w-5/6 flex flex-col justify-between p-6 bg-white bg-opacity-90 rounded-lg shadow-md min-h-[70vh] max-h-[90vh]">
                <div className="bg-red-600 flex  justify-center font-bold text-2xl">Welcome to the chatbot</div>
                <div className="flex-1 overflow-y-auto mb-4">
                    <div className="messages space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${msg.role === "user"
                                    ? "bg-blue-300 text-left"
                                    : "bg-green-300 text-right"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-l-lg"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                
                </form>
            </div>
        </div>
    );
};

export default Chat;
