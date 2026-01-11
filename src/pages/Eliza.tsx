import React, { useState, useEffect, useRef } from 'react';
import { ElizaBot } from '../lib/eliza';
import { Send, RotateCcw, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Eliza() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [eliza] = useState(() => new ElizaBot());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    const initial = eliza.getInitial();
    setMessages([
      {
        id: 'init',
        text: initial,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, [eliza]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Process with Eliza
    // Add a small delay to simulate typing/thinking
    setTimeout(() => {
      const reply = eliza.transform(userText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      
      if (eliza.quit) {
        // handle quit state if needed, maybe disable input
      }
    }, 500 + Math.random() * 500);
  };

  const handleReset = () => {
    eliza.reset();
    const initial = eliza.getInitial();
    setMessages([
      {
        id: Date.now().toString(),
        text: initial,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ELIZA Chatbot</h1>
          <p className="text-gray-600">The original 1966 Rogerian psychotherapist program.</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="Restart conversation"
        >
          <RotateCcw size={16} />
          Restart
        </button>
      </header>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] block mt-1 opacity-70 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Talk to Eliza..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              autoFocus
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span>Send</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-4">
        Original program by Joseph Weizenbaum (1966). JavaScript implementation by Norbert Landsteiner (2005). 
        TypeScript port for Liang.World (2026).
      </p>
    </div>
  );
}
