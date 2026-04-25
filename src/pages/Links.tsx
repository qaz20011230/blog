import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Friend {
  name: string;
  url: string;
  description: string;
}

const friends: Friend[] = [
  {
    name: 'Phaenarete Project',
    url: 'https://phaenarete-project.github.io/Maieutica/',
    description: '人类与 AI 协作直指黎曼假设的宏大工程。',
  },
  {
    name: 'Alibaba Group',
    url: 'https://www.alibabagroup.com/',
    description: '阿里巴巴集团（曾任 CTO，领导全球最大 B2B 电商平台技术战略）。',
  },
  {
    name: '浙江大学软件学院',
    url: 'http://www.cst.zju.edu.cn/',
    description: '2007年起担任电子商务技术系创系主任。',
  }
];

export default function Links() {
  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>友链 | 良之世界</title>
        <meta name="description" content="良之世界的友情链接：研究机构、学术资源与Phaenarete Project相关入口。" />
        <meta name="keywords" content="友情链接, Phaenarete Project, AI for Math Fund, Stanford, UCL, CAS, RAS, 学术资源" />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">友情链接 / Friends</h1>
      
      {friends.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {friends.map((friend) => (
            <a
              key={friend.url}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 bg-white group"
            >
              <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 flex items-center">
                {friend.name}
                <span className="ml-2 text-gray-300 group-hover:text-primary/50 text-sm font-normal">↗</span>
              </h3>
              <p className="text-gray-600 font-serif leading-relaxed">
                {friend.description}
              </p>
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
