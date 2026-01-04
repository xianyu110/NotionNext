const CONFIG = {
  HEO_HOME_POST_TWO_COLS: true, // 首页博客两列显示，若为false则只显示一列
  HEO_LOADING_COVER: true, // 页面加载的遮罩动画

  HEO_HOME_BANNER_ENABLE: true,

  HEO_SITE_CREATE_TIME: '2024-01-01', // 建站日期，用于计算网站运行的第几天

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  HEO_NOTICE_BAR: [
    { title: '欢迎来到 MaynorAI 博客', url: 'https://maynor1024.live' },
    { title: '探索 AI 工具与技术分享', url: 'https://maynor1024.live/category/人工智能' }
  ],

  // 英雄区左右侧组件颠倒位置
  HEO_HERO_REVERSE: false,
  // 博客主体区左右侧组件颠倒位置
  HEO_HERO_BODY_REVERSE: false,

  // 英雄区(首页顶部大卡)
  HEO_HERO_TITLE_1: 'AI 工具探索',
  HEO_HERO_TITLE_2: '技术分享',
  HEO_HERO_TITLE_3: 'MAYNOR1024.LIVE',
  HEO_HERO_TITLE_4: 'MaynorAI',
  HEO_HERO_TITLE_5: '编程爱好者 / 互联网从业者 / 知识分享博主',
  HEO_HERO_TITLE_LINK: 'https://maynor1024.live',
  // 英雄区遮罩文字
  HEO_HERO_COVER_TITLE: '探索更多',

  // 英雄区显示三个置顶分类
  HEO_HERO_CATEGORY_1: { title: '人工智能', url: '/category/人工智能' },
  HEO_HERO_CATEGORY_2: { title: '技术分享', url: '/category/技术分享' },
  HEO_HERO_CATEGORY_3: { title: '实用教程', url: '/tag/教程' },

  // 英雄区右侧推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  HEO_HERO_RECOMMEND_POST_TAG: '推荐',
  HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 推荐文章排序，为`true`时将强制按最后修改时间倒序
  //   HERO_RECOMMEND_COVER: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg', // 英雄区右侧图片

  // 右侧个人资料卡牌欢迎语，点击可自动切换
  HEO_INFOCARD_GREETINGS: [
    '你好！我是 Maynor',
    '🤖 AI 工具探索者',
    '💻 编程爱好者',
    '📝 技术分享博主',
    '🚀 互联网从业者',
    '🎯 知识传播者',
    '⚡ 效率工具专家'
  ],

  // 个人资料底部按钮
  HEO_INFO_CARD_URL1: '/about',
  HEO_INFO_CARD_ICON1: 'fas fa-user',
  HEO_INFO_CARD_URL2: 'https://github.com/xianyu110',
  HEO_INFO_CARD_ICON2: 'fab fa-github',
  HEO_INFO_CARD_URL3: 'https://chatgpt-plus.top',
  HEO_INFO_CARD_TEXT3: 'AI 聚合平台',

  // 用户技能图标
  HEO_GROUP_ICONS: [
    {
      title_1: 'ChatGPT',
      img_1: '/images/heo/chatgpt.svg',
      color_1: '#10a37f',
      title_2: 'Claude',
      img_2: '/images/heo/claude.svg',
      color_2: '#d97757'
    },
    {
      title_1: 'Python',
      img_1: '/images/heo/20235c0731cd4c0c95fc136a8db961fdf963071502.webp',
      color_1: '#3776ab',
      title_2: 'Docker',
      img_2: '/images/heo/20231108a540b2862d26f8850172e4ea58ed075102.webp',
      color_2: '#57b6e6'
    },
    {
      title_1: 'Node.js',
      img_1: '/images/heo/nodejs.svg',
      color_1: '#339933',
      title_2: 'React',
      img_2: '/images/heo/react.svg',
      color_2: '#61dafb'
    },
    {
      title_1: 'TypeScript',
      img_1: '/images/heo/typescript.svg',
      color_1: '#3178c6',
      title_2: 'Git',
      img_2: '/images/heo/2023ffa5707c4e25b6beb3e6a3d286ede4c6071102.webp',
      color_2: '#df5b40'
    },
    {
      title_1: 'JavaScript',
      img_1: '/images/heo/2023786e7fc488f453d5fb2be760c96185c0075502.webp',
      color_1: '#f7cb4f',
      title_2: 'HTML5',
      img_2: '/images/heo/202372b4d760fd8a497d442140c295655426070302.webp',
      color_2: '#e9572b'
    },
    {
      title_1: 'CSS3',
      img_1: '/images/heo/20237c548846044a20dad68a13c0f0e1502f074602.webp',
      color_1: '#2c51db',
      title_2: 'Notion',
      img_2: '/images/heo/notion.svg',
      color_2: '#000000'
    }
  ],

  HEO_SOCIAL_CARD: true, // 是否显示右侧，点击加入社群按钮
  HEO_SOCIAL_CARD_TITLE_1: 'AI 工具平台',
  HEO_SOCIAL_CARD_TITLE_2: '体验全球顶级 AI 模型聚合服务',
  HEO_SOCIAL_CARD_TITLE_3: '立即访问 MaynorAI',
  HEO_SOCIAL_CARD_URL: 'https://chatgpt-plus.top',

  // 底部统计面板文案
  HEO_POST_COUNT_TITLE: '文章数:',
  HEO_SITE_TIME_TITLE: '建站天数:',
  HEO_SITE_VISIT_TITLE: '访问量:',
  HEO_SITE_VISITOR_TITLE: '访客数:',

  // *****  以下配置无效，只是预留开发 ****
  // 菜单配置
  HEO_MENU_INDEX: true, // 显示首页
  HEO_MENU_CATEGORY: true, // 显示分类
  HEO_MENU_TAG: true, // 显示标签
  HEO_MENU_ARCHIVE: true, // 显示归档
  HEO_MENU_SEARCH: true, // 显示搜索

  HEO_POST_LIST_COVER: true, // 列表显示文章封面
  HEO_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  HEO_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  HEO_POST_LIST_SUMMARY: true, // 文章摘要
  HEO_POST_LIST_PREVIEW: false, // 读取文章预览
  HEO_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  HEO_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  HEO_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  HEO_ARTICLE_NOT_BY_AI: false, // 显示非AI写作
  HEO_ARTICLE_RECOMMEND: true, // 文章关联推荐

  HEO_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  HEO_WIDGET_ANALYTICS: false, // 显示统计卡
  HEO_WIDGET_TO_TOP: true,
  HEO_WIDGET_TO_COMMENT: true, // 跳到评论区
  HEO_WIDGET_DARK_MODE: true, // 夜间模式
  HEO_WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG
