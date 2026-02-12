import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Friend {
  name: string;
  url: string;
  description: string;
}

const friends: Friend[] = [
  {
    name: '思想助产士',
    url: 'https://weixin.sogou.com/weixin?type=1&query=思想助产士',
    description: '【微信公众号】苏格拉底式的精神助产，协助你诞生属于自己的思想。',
  },
  {
    name: '哲思锻造坊',
    url: 'https://weixin.sogou.com/weixin?type=1&query=哲思锻造坊',
    description: '【微信公众号】哲学不是避难所，而是锻造场。在此锤炼思维，直面生活。',
  },
  {
    name: 'Aeon',
    url: 'https://www.aeon.info/',
    description: '永旺株式会社，亚洲领先的综合零售集团，也是我目前就职的企业。',
  },
  {
    name: 'IPP',
    url: 'http://www.pratiques-philosophiques.fr/',
    description: 'Institut de Pratiques Philosophiques，我作为咨询师受训的机构。',
  },
  {
    name: 'APPA',
    url: 'https://appa.edu/',
    description: '美国哲学从业者协会，致力于推动哲学咨询与实践的专业化发展。',
  },
  {
    name: 'IEP',
    url: 'https://iep.utm.edu/',
    description: '互联网哲学百科全书，提供高质量、同行评审的哲学学术资源。',
  },
  {
    name: 'SEP',
    url: 'https://plato.stanford.edu/',
    description: '斯坦福哲学百科全书，全球最权威的在线哲学参考著作之一。',
  },
  {
    name: 'ICPP',
    url: 'https://icpp.site/',
    description: '国际哲学实践大会，连接全球哲学践行者的核心学术平台。',
  },
  {
    name: 'Lacan.com',
    url: 'https://www.lacan.com/',
    description: '拉康精神分析网站，汇集了关于雅克·拉康及其学派的深度文献与研究资源。',
  },
  {
    name: 'GDUT',
    url: 'https://glxy.gdut.edu.cn/',
    description: '广东工业大学管理学院，我的学术启蒙之地，融合管理科学与人文精神。',
  },
  {
    name: 'Terence Tao',
    url: 'https://terrytao.wordpress.com/',
    description: '陶哲轩的博客，数学家，菲尔兹奖得主。',
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