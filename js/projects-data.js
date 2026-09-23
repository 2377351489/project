// 项目数据：页面项目列表由此数组驱动，新增项目时在数组中追加一条对象即可
// 字段说明：name 名称 / category 类别 / time 完成时间 / desc 简介 / stack 技术栈 / image 配图 / featured 是否作为代表作放大展示
const PROJECTS = [
  {
    name: "购物平台",
    category: "全栈项目",
    time: "2025.09",
    desc: "一个线上购物交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Modern%20e%2Dcommerce%20shopping%20platform%20web%20interface%2C%20clean%20product%20listing%20page%20with%20search%20bar%2C%20product%20cards%20with%20prices%2C%20shopping%20cart%20icon%2C%20green%20and%20white%20color%20scheme%2C%20minimal%20professional%20UI%20design%2C%20product%20screenshot%20style&image_size=landscape_16_9",
    featured: true
  }
];
