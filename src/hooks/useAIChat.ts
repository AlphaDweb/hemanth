
import { useState, useEffect } from 'react';
import { generateGeminiResponse } from '@/services/geminiService';
import { toast } from 'sonner';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseAIChatOptions {
  initialSystemPrompt?: string;
}

export const useAIChat = (options?: UseAIChatOptions) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm Hemanth's AI assistant! How can I help you today? Feel free to ask me about Hemanth's skills, projects, or experience.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  const systemPrompt = options?.initialSystemPrompt || 
    "You are Hemanth's AI assistant on his portfolio website. You help visitors learn about Hemanth, who is a Computer Science Engineering student specializing in AI, Machine Learning, and Deep Learning. Always be helpful, concise, and professional.";

  // Check for saved API key on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiInput(false);
    }
  }, []);

  const saveApiKey = (key: string) => {
    if (key.trim().length > 0) {
      setApiKey(key);
      localStorage.setItem('gemini_api_key', key);
      setShowApiInput(false);
      toast.success('API key saved successfully');
      return true;
    } else {
      toast.error('Please enter a valid API key');
      return false;
    }
  };

  const removeApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setShowApiInput(true);
    toast.success('API key removed');
  };

  const sendMessage = async (userMessage: string) => {
    if (!apiKey || userMessage.trim() === '') return;
    
    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Create the full prompt with context
      const fullPrompt = `${systemPrompt} Respond to this query: ${userMessage}`;
      
      // Call Gemini API
      const response = await generateGeminiResponse({
        apiKey,
        prompt: fullPrompt
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to get response');
      }
      
      // Add assistant response to chat
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in AI chat:', error);
      // Add error message
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please check your API key or try again later.', 
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi, I'm Hemanth's AI assistant! How can I help you today? Feel free to ask me about Hemanth's skills, projects, or experience.",
        timestamp: new Date(),
      },
    ]);
  };

  return {
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
  };
};

export default useAIChat;
