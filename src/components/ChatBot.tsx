
import React, { useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Send, Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ChatBot = () => {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const conversation = useConversation({
    overrides: {
      agent: {
        prompt: {
          prompt: "You are a helpful multilingual assistant for a smart transport system. You can understand and respond in multiple languages including English, Hindi, and Punjabi. Always respond in the same language the user uses to ask the question.",
        },
        firstMessage: "नमस्ते! Hi! ਸਤ ਸ਼੍ਰੀ ਅਕਾਲ! I'm your multilingual transport assistant. How can I help you today?",
        language: "multilingual",
      },
      tts: {
        voiceId: "pFZP5JQG7iQjIQuC4Bku", // Using Lily's voice
      },
    },
    onMessage: (message) => {
      if (message.type === 'text') {
        setMessages(prev => [...prev, { text: message.text, isUser: false }]);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was an error with the conversation. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const startChat = async () => {
      try {
        await conversation.startSession({
          agentId: "multilingual-transport-agent", // Replace with your actual agent ID
        });
      } catch (error) {
        console.error('Error starting chat:', error);
      }
    };

    startChat();
    
    return () => {
      conversation.endSession();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
    setInputMessage('');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    conversation.setVolume({ volume: isMuted ? 1 : 0 });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Transport Assistant</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="h-8 w-8"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message in any language..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
