import React, { useRef, useEffect, useState } from 'react';
import { Bot, Send, X, Minimize, Maximize, Mic, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import useAIChat from '@/hooks/useAIChat';

// First define the interfaces
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  start(): void;
  stop(): void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
}

// Then declare the global interface
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sendMessage,
    resetChat
  } = useAIChat();

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, minimized]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = async (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
        
        // Automatically send the message
        if (transcript.trim() !== '') {
          await sendMessage(transcript);
          // Speak the last assistant message
          const lastMessage = messages[messages.length - 1];
          if (lastMessage?.role === 'assistant') {
            speakResponse(lastMessage.content);
          }
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [sendMessage, messages]);

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Add text-to-speech for assistant responses
  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Modify handleSubmit to include TTS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    await sendMessage(inputValue);
    // Speak the last assistant message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'assistant') {
      speakResponse(lastMessage.content);
    }
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
                  <div className="relative flex-1">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type or speak your message..."
                      className="bg-[#121212] border-neon-purple/20 text-white pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full",
                        "text-white/60 hover:text-white transition",
                        isListening && "text-red-500 animate-pulse"
                      )}
                      aria-label={isListening ? "Stop listening" : "Start voice input"}
                    >
                      <Mic size={18} />
                    </button>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || inputValue.trim() === ''}
                    className="bg-neon-purple hover:bg-neon-purple/80 px-2"
                  >
                    <Send size={18} />
                  </Button>
                </form>
                
                <div className="flex justify-center mt-2 text-xs text-white/40">
                  <button 
                    onClick={resetChat}
                    className="hover:text-white transition"
                  >
                    Reset Chat
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
