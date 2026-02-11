import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Friend {
  name: string;
  url: string;
  description: string;
  avatar: string;
}

const friends: Friend[] = [
  {
    name: 'APPA',
    url: 'https://appa.edu/',
    description: '美国哲学从业者协会，致力于推动哲学咨询与实践的专业化发展。',
    avatar: 'https://www.google.com/s2/favicons?domain=appa.edu&sz=128',
  },
  {
    name: 'IEP',
    url: 'https://iep.utm.edu/',
    description: '互联网哲学百科全书，提供高质量、同行评审的哲学学术资源。',
    avatar: 'https://www.google.com/s2/favicons?domain=iep.utm.edu&sz=128',
  },
  {
    name: 'SEP',
    url: 'https://plato.stanford.edu/',
    description: '斯坦福哲学百科全书，全球最权威的在线哲学参考著作之一。',
    avatar: 'https://www.google.com/s2/favicons?domain=plato.stanford.edu&sz=128',
  },
  {
    name: 'ICPP',
    url: 'https://icpp.site/',
    description: '国际哲学实践大会，连接全球哲学践行者的核心学术平台。',
    avatar: 'https://www.google.com/s2/favicons?domain=icpp.site&sz=128',
  },
  {
    name: 'GDUT',
    url: 'https://glxy.gdut.edu.cn/',
    description: '广东工业大学管理学院，我的学术启蒙之地，融合管理科学与人文精神。',
    avatar: 'https://www.google.com/s2/favicons?domain=glxy.gdut.edu.cn&sz=128',
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
      
      {friends.length > 0 ? (
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
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">暂无友情链接，欢迎申请交换。</p>
        </div>
      )}

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