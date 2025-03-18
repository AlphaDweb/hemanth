
import React, { useRef, useEffect, useState } from 'react';
import { Bot, Send, X, Minimize, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import useAIChat from '@/hooks/useAIChat';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    showApiInput,
    apiKey,
    setApiKey,
    sendMessage,
    resetChat,
    saveApiKey,
    removeApiKey
  } = useAIChat();

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, minimized]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKey(apiKey);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    await sendMessage(inputValue);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <>
      {/* Chat button fixed to bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full bg-neon-purple text-white shadow-lg",
          "hover:bg-neon-purple/90 transition-all duration-300 z-50",
          "neon-glow"
        )}
        aria-label="Open chat assistant"
      >
        <Bot size={24} />
      </button>

      {/* Chat interface */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className={cn(
            "sm:max-w-[400px] md:max-w-[450px] bg-[#121212] border border-neon-purple/20 p-0 overflow-hidden",
            "transition-all duration-300",
            minimized ? "h-[60px] sm:h-[60px] overflow-hidden" : "h-[500px] sm:h-[600px]"
          )}
        >
          <div className="flex justify-between items-center bg-[#1A1A1A] border-b border-neon-purple/20 p-3">
            <div className="flex items-center gap-2">
              <Bot className="text-neon-purple" size={20} />
              <DialogTitle className="text-white">AI Assistant</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMinimize} 
                className="text-white/60 hover:text-white transition"
                aria-label={minimized ? "Maximize" : "Minimize"}
              >
                {minimized ? <Maximize size={18} /> : <Minimize size={18} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/60 hover:text-white transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {!minimized && (
            <>
              {showApiInput ? (
                <div className="flex-1 p-4 bg-[#121212] overflow-y-auto flex flex-col">
                  <div className="text-white mb-4">
                    <p>Please enter your Gemini API key to use the AI assistant:</p>
                    <p className="text-xs text-white/60 mt-2">
                      Your API key is stored locally and is never sent to our servers.
                    </p>
                  </div>
                  <form onSubmit={handleApiKeySubmit} className="space-y-3">
                    <Input
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your Gemini API key..."
                      className="bg-[#1A1A1A] border-neon-purple/20 text-white"
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-neon-purple hover:bg-neon-purple/80"
                    >
                      Save API Key
                    </Button>
                  </form>
                  <p className="text-xs text-white/60 mt-4">
                    Don't have a Gemini API key? Get one from the 
                    <a 
                      href="https://ai.google.dev/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-purple ml-1 hover:underline"
                    >
                      Google AI Studio
                    </a>.
                  </p>
                </div>
              ) : (
                <>
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 p-4 bg-[#121212] overflow-y-auto max-h-[calc(600px-120px)]"
                  >
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "mb-4 p-3 rounded-lg max-w-[80%] animate-in fade-in duration-200",
                          message.role === 'user' 
                            ? "bg-neon-purple/20 ml-auto" 
                            : "bg-[#1A1A1A] mr-auto"
                        )}
                      >
                        <div className="text-white text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className="text-xs text-white/40 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="mb-4 p-3 rounded-lg max-w-[80%] bg-[#1A1A1A] mr-auto animate-pulse">
                        <div className="text-white text-sm">Thinking...</div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-3 border-t border-neon-purple/20 bg-[#1A1A1A]">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="bg-[#121212] border-neon-purple/20 text-white"
                        disabled={isLoading}
                      />
                      <Button 
                        type="submit" 
                        disabled={isLoading || inputValue.trim() === ''}
                        className="bg-neon-purple hover:bg-neon-purple/80 px-2"
                      >
                        <Send size={18} />
                      </Button>
                    </form>
                    
                    <div className="flex justify-between mt-2 text-xs text-white/40">
                      <button 
                        onClick={resetChat}
                        className="hover:text-white transition"
                      >
                        Reset Chat
                      </button>
                      <button 
                        onClick={removeApiKey}
                        className="hover:text-white transition"
                      >
                        Change API Key
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
