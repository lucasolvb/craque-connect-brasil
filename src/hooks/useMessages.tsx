
import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: Message;
  unreadCount: number;
}

export const useMessages = () => {
  const { user } = useSupabaseAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<{ [conversationId: string]: Message[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app would come from backend
  useEffect(() => {
    if (user?.id && user.user_metadata?.user_type === 'clube') {
      // Mock conversations for clubs
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participantId: 'player1',
          participantName: 'Carlos Silva',
          participantAvatar: undefined,
          lastMessage: {
            id: 'msg1',
            senderId: 'player1',
            receiverId: user.id,
            content: 'Obrigado pelo interesse no meu perfil!',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            isRead: false
          },
          unreadCount: 1
        }
      ];
      setConversations(mockConversations);
    }
  }, [user]);

  const sendMessage = (receiverId: string, content: string) => {
    if (!user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      content,
      timestamp: new Date(),
      isRead: false
    };

    // Add to messages
    const conversationId = `${user.id}_${receiverId}`;
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    // Update conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.participantId === receiverId 
          ? { ...conv, lastMessage: newMessage, unreadCount: 0 }
          : conv
      )
    );
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  return {
    conversations,
    messages,
    sendMessage,
    markAsRead,
    isLoading
  };
};
