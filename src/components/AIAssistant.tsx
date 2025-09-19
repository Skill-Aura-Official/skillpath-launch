import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Sparkles,
  HelpCircle,
  Briefcase,
  FileText,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  label: string;
  icon: any;
  message: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI career assistant. I can help you with job searches, resume tips, interview preparation, and career guidance. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, profile } = useAuth();

  const quickActions: QuickAction[] = [
    {
      label: 'Find Jobs',
      icon: Briefcase,
      message: 'Help me find relevant job opportunities'
    },
    {
      label: 'Resume Tips',
      icon: FileText,
      message: 'Give me resume writing tips'
    },
    {
      label: 'Interview Prep',
      icon: Users,
      message: 'Help me prepare for interviews'
    },
    {
      label: 'Career Advice',
      icon: HelpCircle,
      message: 'I need career guidance'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Job search related
    if (lowerMessage.includes('job') || lowerMessage.includes('find') || lowerMessage.includes('search')) {
      return "I'd be happy to help you find jobs! Here are some tips:\n\n• Use specific keywords related to your skills\n• Filter by location and job type\n• Save interesting positions to apply later\n• Set up job alerts for new opportunities\n\nWhat type of role are you looking for?";
    }
    
    // Resume related
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "Great question about resumes! Here are key tips:\n\n• Keep it concise (1-2 pages max)\n• Use action verbs and quantify achievements\n• Tailor it to each job application\n• Include relevant skills and keywords\n• Use our AI Resume Builder for optimization\n\nWould you like specific advice for your industry?";
    }
    
    // Interview related
    if (lowerMessage.includes('interview') || lowerMessage.includes('preparation')) {
      return "Interview preparation is crucial! Here's how to ace it:\n\n• Research the company thoroughly\n• Practice common interview questions\n• Prepare STAR method examples\n• Dress appropriately and arrive early\n• Prepare thoughtful questions to ask\n\nWhat type of interview are you preparing for?";
    }
    
    // Salary related
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate') || lowerMessage.includes('pay')) {
      return "Salary negotiation tips:\n\n• Research market rates for your role\n• Consider the total compensation package\n• Practice your negotiation conversation\n• Be confident but respectful\n• Know your worth and minimum acceptable offer\n\nWould you like help researching salary ranges?";
    }
    
    // Skills related
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('improve')) {
      return "Skill development is key to career growth:\n\n• Identify in-demand skills in your field\n• Take online courses and certifications\n• Practice through projects and volunteering\n• Update your profile with new skills\n• Consider our skill gap analysis feature\n\nWhat skills are you interested in developing?";
    }
    
    // Career guidance
    if (lowerMessage.includes('career') || lowerMessage.includes('advice') || lowerMessage.includes('guidance')) {
      return "I'm here to help with your career journey:\n\n• Define your career goals and interests\n• Build a strong professional network\n• Keep learning and adapting\n• Seek mentorship opportunities\n• Maintain work-life balance\n\nWhat specific career challenges are you facing?";
    }
    
    // Default response
    return "Thanks for your question! I can help you with:\n\n• Job searching and applications\n• Resume and profile optimization\n• Interview preparation\n• Career planning and advice\n• Skill development\n• Salary negotiation\n\nFeel free to ask me anything specific about your job search or career!";
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(content),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.message);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent"
          size="icon"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 sm:w-96 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[500px]'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-full">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Career Assistant</CardTitle>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[444px]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'assistant' && (
                      <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[70%] ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div className={`p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.type === 'user' && (
                      <div className="p-2 bg-primary/10 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-muted/30">
                <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Quick actions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => handleQuickAction(action)}
                    >
                      <action.icon className="h-3 w-3 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your career..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  className="flex-1"
                />
                <Button 
                  size="icon" 
                  variant="gradient"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;