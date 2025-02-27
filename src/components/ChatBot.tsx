
import React, { useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lwzvelmoikkelnagnqen.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3enZlbG1vaWtrZWxuYWducWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNjQwMDAsImV4cCI6MjAyNDY0MDAwMH0.SZoGpF0HfiJ8i_4_1QN7kglrME2SQFVleM7coKTSXuo'
);

const ChatBot = () => {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

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
        voiceId: "pFZP5JQG7iQjIQuC4Bku",
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
          agentId: "multilingual-transport-agent",
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
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-mistral', {
        body: {
          messages: [
            ...messages.map(msg => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: inputMessage }
          ]
        }
      });

      if (error) throw error;

      if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
        if (!isMuted) {
          conversation.setVolume({ volume: 1 });
          await conversation.startSession({
            agentId: "multilingual-transport-agent",
          });
          if (conversation.status === 'connected') {
            conversation.onMessage({ type: 'text', text: data.reply });
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from the assistant.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setInputMessage('');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    conversation.setVolume({ volume: isMuted ? 1 : 0 });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
        formData.append('model', 'whisper-1');

        try {
          const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: formData,
          });

          const data = await response.json();
          if (data.text) {
            setInputMessage(data.text);
          }
        } catch (error) {
          console.error('Error transcribing audio:', error);
          toast({
            title: "Error",
            description: "Failed to transcribe audio. Please try again.",
            variant: "destructive",
          });
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Failed to access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
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
            onKeyPress={(e) => e.key === 'Enter' && !isProcessing && handleSendMessage()}
            placeholder="Type your message in any language..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant="outline"
            className={isRecording ? 'bg-red-100' : ''}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button onClick={handleSendMessage} disabled={isProcessing}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

