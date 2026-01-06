import React from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeLabel }) => (
  <div className="bg-eerie-black-2 border border-jet rounded-2xl p-6 hover:border-orange-yellow-crayola/30 transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-light-gray-70 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white-2">{value}</p>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {change >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-400" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-light-gray-70">{changeLabel}</span>
          </div>
        )}
      </div>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-yellow-crayola/20 to-vegas-gold/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

interface RecentMessageProps {
  name: string;
  email: string;
  message: string;
  time: string;
}

const RecentMessage: React.FC<RecentMessageProps> = ({ name, email, message, time }) => (
  <div className="flex gap-4 p-4 bg-smoky-black-1 rounded-xl hover:bg-jet/30 transition-all cursor-pointer">
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-yellow-crayola to-vegas-gold flex items-center justify-center text-smoky-black font-bold flex-shrink-0">
      {name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-white-2 truncate">{name}</p>
        <span className="text-xs text-light-gray-70 flex-shrink-0">{time}</span>
      </div>
      <p className="text-sm text-light-gray-70 truncate">{email}</p>
      <p className="text-sm text-light-gray-70/70 truncate mt-1">{message}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  // Mock data - replace with API calls
  const stats = {
    visitors: 1250,
    projects: 12,
    blogPosts: 8,
    messages: 24,
  };

  const recentMessages = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hi, I would like to discuss a potential project with you...',
      time: '5 min ago',
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@company.com',
      message: 'Great portfolio! Can we schedule a call to discuss collaboration?',
      time: '30 min ago',
    },
    {
      name: 'Mike Johnson',
      email: 'mike.j@startup.io',
      message: 'Interested in your web development services for our startup.',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Visitors"
          value={stats.visitors.toLocaleString()}
          icon={<Eye className="w-6 h-6 text-orange-yellow-crayola" />}
          change={12}
          changeLabel="vs last month"
        />
        <StatCard
          title="Projects"
          value={stats.projects}
          icon={<Briefcase className="w-6 h-6 text-orange-yellow-crayola" />}
          change={8}
          changeLabel="new this month"
        />
        <StatCard
          title="Blog Posts"
          value={stats.blogPosts}
          icon={<FileText className="w-6 h-6 text-orange-yellow-crayola" />}
          change={25}
          changeLabel="vs last month"
        />
        <StatCard
          title="Messages"
          value={stats.messages}
          icon={<MessageSquare className="w-6 h-6 text-orange-yellow-crayola" />}
          change={-5}
          changeLabel="vs last month"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-eerie-black-2 border border-jet rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white-2">Recent Messages</h3>
            <a
              href="/admin/messages"
              className="text-sm text-orange-yellow-crayola hover:text-vegas-gold transition-colors"
            >
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recentMessages.map((msg, index) => (
              <RecentMessage key={index} {...msg} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-eerie-black-2 border border-jet rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white-2 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/admin/projects"
              className="flex items-center gap-3 p-4 bg-smoky-black-1 rounded-xl hover:bg-jet/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white-2 group-hover:text-orange-yellow-crayola transition-colors">
                  Add New Project
                </p>
                <p className="text-sm text-light-gray-70">Showcase your latest work</p>
              </div>
            </a>
            <a
              href="/admin/blog"
              className="flex items-center gap-3 p-4 bg-smoky-black-1 rounded-xl hover:bg-jet/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white-2 group-hover:text-orange-yellow-crayola transition-colors">
                  Write Blog Post
                </p>
                <p className="text-sm text-light-gray-70">Share your knowledge</p>
              </div>
            </a>
            <a
              href="/admin/profile"
              className="flex items-center gap-3 p-4 bg-smoky-black-1 rounded-xl hover:bg-jet/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white-2 group-hover:text-orange-yellow-crayola transition-colors">
                  Update Profile
                </p>
                <p className="text-sm text-light-gray-70">Keep your info current</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
