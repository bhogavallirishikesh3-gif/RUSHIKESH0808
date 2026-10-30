import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, X, User, Bot, RefreshCw, HelpCircle, ChevronRight } from 'lucide-react';
import { LanguageCode, UI_STRINGS, getUIString } from '../utils/i18n';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface CivicChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: LanguageCode;
}

export const CivicChatbotModal: React.FC<CivicChatbotModalProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'en',
}) => {
  const isKn = currentLanguage === 'kn';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      text: isKn
        ? 'ನಮಸ್ಕಾರ! ನಾನು DamGo ನಾಗರಿಕ AI ಸಹಾಯಕ. ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ? ರಸ್ತೆ ಗುಂಡಿ ದೂರು ನೀಡುವುದು, ರಿಪೇರಿ ಸಮಯ, ಅಥವಾ ಮುನ್ಸಿಪಲ್ ನಿಯಮಗಳ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲೇ ಕೇಳಬಹುದು.'
        : 'Hello! I am DamGo Civic AI Assistant. How can I help you today? You can ask me how to report infrastructure defects, check municipal repair SLAs, or inquire about civic hazard prioritization.',
      timestamp: isKn ? 'ಈಗಷ್ಟೇ' : 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = isKn
    ? [
        'ರಸ್ತೆ ಗುಂಡಿ ದೂರು ನೀಡುವುದು ಹೇಗೆ?',
        'ಬೀದಿ ದೀಪ ರಿಪೇರಿ ಆಗಲು ಎಷ್ಟು ಸಮಯ ಬೇಕು?',
        'ನೀರು ಸೋರಿಕೆ ತುರ್ತು ಸಹಾಯ ಪಡೆಯುವುದು ಹೇಗೆ?',
        'ದೂರಿನ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸುವುದು ಹೇಗೆ?',
      ]
    : [
        'How do I report a pothole in a school zone?',
        'What is the SLA for broken streetlights?',
        'How does DamGo deduplicate similar reports?',
        'What equipment is needed for water pipe bursts?',
      ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      const modelReply = data.reply || 'Thank you for reaching out. Please submit your issue with photo and location coordinates.';

      setMessages((prev) => [
        ...prev,
        {
          id: `mod-${Date.now()}`,
          role: 'model',
          text: modelReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `mod-err-${Date.now()}`,
          role: 'model',
          text: 'I am currently operating in high-availability mode. You can submit reports directly through the Citizen Portal or inspect ongoing work tickets in the Command Center.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Chatbot Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-100 text-sm">DamGo Civic AI Assistant</h3>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-neutral-400">Multi-turn municipal assistance & triage guidance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Message Thread */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-900/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  msg.role === 'user'
                    ? 'bg-neutral-800 text-neutral-300'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-neutral-950 text-neutral-200 border border-neutral-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="text-[9px] text-neutral-400 block mt-1 text-right font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-950 p-3 rounded-2xl border border-neutral-800 w-max">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>DamGo AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Questions Pills */}
        <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800/80 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[10px] uppercase font-mono text-neutral-500 shrink-0">Quick prompts:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-[11px] whitespace-nowrap transition flex items-center gap-1 shrink-0"
            >
              <span>{q}</span>
              <ChevronRight className="w-2.5 h-2.5 text-emerald-400" />
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={getUIString(currentLanguage, 'chatPlaceholder')}
            className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition shadow"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
