import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  MailOpen, 
  Trash2, 
  Clock, 
  User,
  ChevronRight,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: Date;
  read: boolean;
}

// Mock data
const mockMessages: Message[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Hi, I would like to discuss a potential project with you. I have a web application idea that needs a skilled developer. Would you be available for a call next week?',
    date: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@company.com',
    subject: 'Collaboration Opportunity',
    message: 'Great portfolio! I represent a tech startup and we are looking for freelance developers for an upcoming project. Can we schedule a call to discuss further?',
    date: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.j@startup.io',
    subject: 'Web Development Services',
    message: 'Interested in your web development services for our startup. We need a complete redesign of our platform with React and modern technologies.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@design.co',
    subject: 'UI/UX Consultation',
    message: 'Hello! I am looking for someone to help with the frontend implementation of our new design system. Your work looks impressive.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && !msg.read;
    if (filter === 'read') return matchesSearch && msg.read;
    return matchesSearch;
  });

  const handleMarkAsRead = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const handleDelete = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      handleMarkAsRead(msg.id);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Messages List */}
      <div className="w-96 flex flex-col bg-eerie-black-2 border border-jet rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-jet">
          <h2 className="text-lg font-semibold text-white-2 mb-4">
            Messages {unreadCount > 0 && <span className="text-orange-yellow-crayola">({unreadCount})</span>}
          </h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray-70" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-smoky-black-1 border border-jet rounded-xl text-white-2 placeholder-light-gray-70 focus:outline-none focus:border-orange-yellow-crayola transition-all text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {(['all', 'unread', 'read'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-orange-yellow-crayola text-smoky-black'
                    : 'bg-smoky-black-1 text-light-gray-70 hover:text-white-2'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="w-12 h-12 text-light-gray-70/30 mx-auto mb-3" />
              <p className="text-light-gray-70">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 border-b border-jet/50 cursor-pointer transition-all ${
                  selectedMessage?.id === msg.id
                    ? 'bg-orange-yellow-crayola/10 border-l-4 border-l-orange-yellow-crayola'
                    : 'hover:bg-jet/30'
                } ${!msg.read ? 'bg-orange-yellow-crayola/5' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold flex items-center justify-center text-smoky-black font-bold flex-shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium truncate ${msg.read ? 'text-light-gray-70' : 'text-white-2'}`}>
                        {msg.name}
                      </p>
                      {!msg.read && (
                        <div className="w-2 h-2 rounded-full bg-orange-yellow-crayola flex-shrink-0" />
                      )}
                    </div>
                    <p className={`text-sm truncate ${msg.read ? 'text-light-gray-70/70' : 'text-light-gray-70'}`}>
                      {msg.subject}
                    </p>
                    <p className="text-xs text-light-gray-70/50 mt-1">
                      {formatDistanceToNow(msg.date, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 bg-eerie-black-2 border border-jet rounded-2xl overflow-hidden">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-jet">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold flex items-center justify-center text-smoky-black font-bold text-lg">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white-2">{selectedMessage.name}</h3>
                    <p className="text-sm text-light-gray-70">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 rounded-lg bg-smoky-black-1 text-light-gray-70 hover:text-white-2 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="px-6 py-4 border-b border-jet/50">
              <p className="text-sm text-light-gray-70">Subject:</p>
              <h4 className="text-white-2 font-medium">{selectedMessage.subject}</h4>
            </div>

            {/* Time */}
            <div className="px-6 py-3 flex items-center gap-2 text-sm text-light-gray-70 border-b border-jet/50">
              <Clock className="w-4 h-4" />
              {selectedMessage.date.toLocaleString()}
            </div>

            {/* Message Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-light-gray-70 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            {/* Reply Action */}
            <div className="p-4 border-t border-jet">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold text-smoky-black font-semibold rounded-xl hover:shadow-shadow-4 transition-all"
              >
                <Mail className="w-5 h-5" />
                Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <Mail className="w-16 h-16 text-light-gray-70/30 mb-4" />
            <h3 className="text-lg font-medium text-white-2 mb-2">Select a message</h3>
            <p className="text-light-gray-70">Choose a message from the list to view its contents</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
