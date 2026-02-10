import { useRef, useEffect, useState } from 'react';
import { Send, Bot, User as UserIcon, Loader2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import type { AgentMessage } from './types';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  messages: AgentMessage[];
  isLoading: boolean;
  status: string;
  onSendMessage: (content: string) => void;
  hasApiKey: boolean;
}

export default function ChatInterface({ messages, isLoading, status, onSendMessage, hasApiKey }: ChatInterfaceProps) {
  const { t } = useTranslation('lab');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const isStreaming = messages.length > 0 &&
    messages[messages.length - 1].role === 'assistant' &&
    messages[messages.length - 1].content.length > 0 &&
    !messages[messages.length - 1].content.includes('<search>');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3 max-w-[90%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                msg.role === 'user' ? "bg-primary-100 text-primary-600" : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              )}
            >
              {msg.role === 'user' ? <UserIcon size={18} /> : <Bot size={18} />}
            </div>

            <div className="flex flex-col gap-2">
              <div
                className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user'
                    ? "bg-primary-600 text-white rounded-tr-none"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 rounded-tl-none"
                )}
              >
                {msg.role === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2">
                    <ReactMarkdown
                      components={{
                        a: ({ node, href, children, ...props }) => {
                          const isCitation = typeof children === 'string' && /^\[\d+\]$/.test(children);
                          if (isCitation) {
                            return (
                              <sup className="inline-block ml-0.5 select-none">
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold no-underline px-1 rounded hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors cursor-pointer"
                                  {...props}
                                >
                                  {children}
                                </a>
                              </sup>
                            );
                          }
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                              {...props}
                            >
                              {children}
                            </a>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* Citations / References */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="text-xs bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 rounded-lg p-3 mt-1">
                  <p className="font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                    <ExternalLink size={12} /> {t('agent.chat.references')}
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {msg.citations.map((url, idx) => (
                      <li key={idx} className="truncate">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Status / Loading Indicator */}
        {(isLoading || status) && !isStreaming && (
          <div className="flex gap-3 animate-in fade-in duration-300">
             <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={18} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 p-3 rounded-2xl rounded-tl-none text-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="font-medium">{status || t('agent.chat.thinking', 'Thinking...')}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={hasApiKey ? t('agent.chat.placeholder') : t('agent.welcome')}
            disabled={!hasApiKey || isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-zinc-800/50 text-sm dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={!hasApiKey || isLoading || !input.trim()}
            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
