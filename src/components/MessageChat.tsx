
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';  
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowLeft, User } from 'lucide-react';
import { useMessages, Conversation, Message } from '@/hooks/useMessages';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MessageChatProps {
  onBack?: () => void;
}

const MessageChat: React.FC<MessageChatProps> = ({ onBack }) => {
  const { conversations, messages, sendMessage, markAsRead } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const conversation = conversations.find(c => c.id === selectedConversation);
    if (conversation) {
      sendMessage(conversation.participantId, newMessage);
      setNewMessage('');
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    markAsRead(conversationId);
  };

  if (selectedConversation) {
    const conversation = conversations.find(c => c.id === selectedConversation);
    const conversationMessages = messages[`${conversation?.participantId}`] || [];

    return (
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center space-y-0 pb-3">
          <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3 ml-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              {conversation?.participantAvatar ? (
                <img src={conversation.participantAvatar} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{conversation?.participantName}</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.senderId === 'current_user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 'current_user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mensagens</CardTitle>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>Nenhuma conversa ainda</p>
              <p className="text-sm mt-1">Comece a conversar com jogadores!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {conversation.participantAvatar ? (
                        <img src={conversation.participantAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{conversation.participantName}</h4>
                        <div className="flex items-center space-x-2">
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(conversation.lastMessage.timestamp, { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MessageChat;
