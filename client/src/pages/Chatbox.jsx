import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
        const response = await fetch('https://smart-expenseive-tracker.onrender.com/generate', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: input }),  // Send the input as 'query'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend API Error:', errorData);
            const botErrorMessage = { text: 'Sorry, something went wrong with the AI service.', sender: 'bot' };
            setMessages(prev => [...prev, botErrorMessage]);
            return;
        }

        const data = await response.text();  // The response will contain the AI-generated text
        console.log('Backend Response:', data);

        const botMessage = { text: data, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
        console.error('Frontend Fetch Error:', error);
        const botErrorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' };
        setMessages(prev => [...prev, botErrorMessage]);
    }
};

  // Scroll to the bottom of the chat container on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition duration-300 z-50"
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Toggle Chat"
      >
        💬
      </button>

      {isVisible && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl w-80 h-96 z-40 flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chat</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close Chat"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-300 flex items-center">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') sendMessage();
              }}
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
