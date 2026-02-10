import React from 'react';
import { Helmet } from 'react-helmet-async';

const friends = [
  {
    name: '良的世界',
    url: 'https://www.lemonary.cn/',
    description: '忙点充实，闲点自在',
    avatar: 'https://www.lemonary.cn/wp-content/uploads/2024/12/profile.jpg',
  },
];

export default function Links() {
  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>友链 | 良之世界</title>
        <meta name="description" content="良之世界的友情链接 - 怀瑾握瑜，解惑忘隙" />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">友情链接 / Friends</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {friends.map((friend) => (
          <a
            key={friend.url}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300 bg-white"
          >
            <div className="flex-shrink-0 mr-4">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                {friend.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {friend.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-4">申请友链</h3>
        <p className="text-gray-600 mb-4">
          如果您想交换友链，请确保您的网站内容健康、持续更新。
          <br />
          请按以下格式发送邮件至 <a href="mailto:contact@liang.world" className="text-primary hover:underline">contact@liang.world</a>
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 font-mono text-sm text-gray-600">
          <p>站点名称：良之世界</p>
          <p>站点地址：https://liang.world</p>
          <p>站点描述：怀瑾握瑜，解惑忘隙</p>
          <p>站点头像：https://liang.world/favicon.jpg</p>
          <p>RSS地址：https://liang.world/rss.xml</p>
        </div>
      </div>
    </div>
  );
}