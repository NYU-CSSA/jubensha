const plays = ['《缄默法则》', '《审判日》', '《7彩人生》'];

const results = [
  {
    food: '自由洒脱的披萨',
    place: ["Joe's Pizza", 'Rubirosa', 'Prince Street Pizza'],
    desc:
      '你是不拘小节的仗义伙伴，快乐热情的小太阳，精力十足的浪漫主义者，斗志昂扬又好胜的行动派。',
    roles: [
      '热情四射的Lucas，男',
      '乐观开朗的苏珊，女',
      '精明直爽的男房客，男',
      '聪明善良的酒店经理，男',
      '自信大方的Phoebe，女',
      '无忧无虑的Sebastian，男',
    ],
  },
  {
    food: '火辣滋补鸳鸯火锅',
    place: ['香天下', '99 hot pot', '大龙燚'],
    desc:
      '你是奔放与细腻相依，开朗与稳重并存，包容万物的思考者，自信强大的人生享受家。',
    roles: [
      '勇敢正义的乔治，男',
      '热情泼辣的苏珊，女',
      '外向和善的酒店经理，男',
      '帅气果断的当地黑帮，男',
      '内心丰富的Gabriel，女',
      '绅士心机男Evan，男',
    ],
  },
  {
    food: '百变戏精百吉饼',
    place: ['Flybybagels', 'Think coffee', 'Weinstein Hall'],
    desc:
      '你是外冷内热的宝藏青年，内在丰富的戏精少年，忍术十级的自我消化主义，善解人意的倾听解惑者。',
    roles: [
      '铁汉柔情的安杰罗，男',
      '内向严谨的派蒂，女',
      '人畜无害的酒店清洁工，女',
      '孤僻机敏的议员秘书，男/女',
      '蛇蝎美人Glinda，女',
      '内向闷骚的Lucas，男',
    ],
  },
  {
    food: '朴实清新小寿司',
    place: ['Kissaki', 'Ise Restaurant'],
    desc:
      '你是机敏聪慧的实干家，平平无奇认真努力小天才，时而有着天真烂漫的脑洞的梦想家，内敛温和的你向往着平稳的生活',
    roles: [
      '乐天派的乔治，男',
      '天真烂漫的陈美玲，女',
      '敏感外向的美女房客，女',
      '扮猪吃老虎的酒店清洁工，女',
      '忧郁傲娇的Gabriel，女',
      '敏感中二的William，男',
    ],
  },
  {
    food: '人间清醒黑咖啡',
    place: ['Think Coffee', 'Bluebottle', 'Starbucks'],
    desc:
      '你是行动值爆表又努力的上进派，化腐朽为神奇多思多想的智者，自信又品味小众的腹黑，体贴理智的倾听者。',
    roles: [
      '安静自我的安杰罗，男',
      '内向严谨的派蒂，女',
      '孤僻的细节控议员秘书，男/女',
      '成熟精明的当地黑帮，男',
      '斯文败类的腹黑男Evan，男',
      '眼明心亮的利己主义Glinda，女',
    ],
  },
];

const questions = [
  ['placeholder for question 0', [], []],
  [
    '你在某天刷抖音的时候看到了一个特别想去的地方，你会：',
    [
      'A. 立马来一趟说走就走的旅行',
      'B. 放进收藏夹以便以后空闲的时候再去',
      'C. 我的想象力可以带我去到任何地方，看过即去过',
      'D. 仔细考虑旅途的必要性后再决定',
    ],
    [5, 4, 2, 1],
  ],
  [
    '晚上散步的时候，在路边树丛边上突然看到了一个黑影，你认为这是：',
    [
      'A. 一只可爱的流浪猫',
      'B. 过街串巷的老鼠',
      'C. 一只被人遗弃的刺猬',
      'D. 可能只是风吹走的垃圾袋',
    ],
    [5, 3, 2, 1],
  ],
  [
    '在玩剧本杀的时候你会：',
    [
      'A. 非常积极的参与到所有环节，想要成为全场的焦点',
      'B. 跟着场上的节奏，并在有不同看法的时候主动提出',
      'C. 努力完成自己的任务，办好自己的角色，不多说话',
      'D. 多听多想多看少说话，抓漏洞找线索是第一要务',
    ],
    [5, 4, 3, 1],
  ],
  [
    '终于又是一个周末了，想要放松一下的你会比较喜欢：',
    [
      'A. 就该找几个朋友出去逛吃逛吃',
      'B. 出去健身运动挥洒汗水然后回家休息',
      'C. 在家追剧打游戏，刷饭刷综艺刷漫画',
      'D. 安静的一个人听听音乐看看书',
    ],
    [5, 3, 2, 1],
  ],
  [
    '自己一个人出去吃饭的时候，你会选择：',
    [
      'A. 去海底捞享受至尊服务',
      'B. 很地道，开在街边小巷好吃的小排档',
      'C. 麦当劳肯德基的 炸鸡汉堡过过瘾',
      'D. 安静且非常宽敞的日本料理',
    ],
    [5, 4, 2, 0],
  ],
  [
    '晚餐时间，你理想中的吃饭搭档：',
    [
      'A. 和朋友一起才吃嘛嘛香',
      'B. 有的时候自己吃饭感觉还行，但是还是希望有人一起吃',
      'C. 我很随意的，怎么舒服怎么来',
      'D. 美味大餐，我，还有我的手机是perfect combo',
    ],
    [5, 3, 2, 1],
  ],
  [
    '玩游戏时的你是：',
    [
      'A. 和谁都能玩，大家都是我的兄弟姐妹，我就是游戏达人！',
      'B. 啥游戏都行，大家玩啥我就玩啥，我不挑～',
      'C. 就我和我的一两个好基友玩些我们的common game！',
      'D. 一个人能玩的游戏就是我的first pick！',
    ],
    [5, 3, 2, 0],
  ],
];

export { results, plays, questions };
