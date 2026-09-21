const app = document.querySelector('#app');

const stages = [
  ['studying', '在读 / 准备升学', '学业、方向与自我定义'],
  ['first-job', '初入职场', '适应、选择与证明自己'],
  ['transition', '职业转换期', '离开旧轨道，寻找新坐标'],
  ['relationship', '关系与家庭变化', '亲密关系、家庭期待与边界'],
  ['care', '育儿 / 照护阶段', '角色增加，自己的位置变小'],
  ['rebuild', '重新开始', '经历中断、失去或重大改变']
];

const questions = [
  ['当原本的计划突然被打乱，你最先冒出的念头是？', [['script','现在这一切还有什么意义？'],['choice','我该马上找一条新路。'],['failure','是不是我哪里做得不够好？'],['loss','我还没有准备好告别原来的生活。']]],
  ['看到同龄人的进展时，你更接近哪种感受？', [['compare','我像被留在了后面。'],['identity','他们都知道自己是谁，只有我不知道。'],['exhaustion','我已经很努力了，却还是没有抵达。'],['autonomy','那真的是我想要的人生吗？']]],
  ['如果暂时不考虑“应该”，你最想先解决什么？', [['identity','弄清我真正重视什么。'],['choice','选出下一步，不再反复。'],['autonomy','把别人的声音调小一点。'],['exhaustion','先恢复一点力气和感觉。']]],
  ['最近的你，最常怎样面对不安？', [['state-ruminate','一遍遍分析，却更难决定。'],['state-freeze','拖着不动，像被按下暂停。'],['state-push','逼自己做更多，不敢停。'],['state-avoid','先躲开，不去想也不去看。']]],
  ['哪句话最容易刺痛你？', [['failure','“你已经试过这么久了。”'],['compare','“别人怎么都可以？”'],['identity','“你到底想成为什么样的人？”'],['autonomy','“我们都是为你好。”']]],
  ['关于“选择”，你最担心的是？', [['choice','选错后，再也回不到原点。'],['script','未来和我设想的完全不同。'],['autonomy','让重要的人失望。'],['identity','每条路都不像真正的我。']]],
  ['一段努力迟迟没有结果，你会更像？', [['failure','把结果归因于自己不够好。'],['exhaustion','慢慢失去热情和意义感。'],['compare','不断检查别人走到了哪里。'],['state-push','加倍用力，不许自己休息。']]],
  ['最近哪种变化最让你不适应？', [['role','旧身份已经放不下现在的我。'],['loss','有些人或事真的回不来了。'],['script','原来的生活秩序失效了。'],['identity','我说不清现在的自己。']]],
  ['当别人对你有明确期待时，你通常？', [['autonomy','先满足对方，再压下自己的需要。'],['state-ruminate','反复权衡每个人会不会失望。'],['state-avoid','不回应，也不做决定。'],['role','努力扮演好那个被需要的角色。']]],
  ['如果明天醒来轻松了一点，最可能因为什么？', [['choice','我知道下一小步是什么。'],['identity','我允许自己按真实感受生活。'],['exhaustion','我不再需要一直证明价值。'],['loss','我能带着失去继续向前。']]],
  ['你对“重新开始”的直觉更像？', [['script','它意味着承认原计划失败。'],['role','我要先认识新的自己。'],['choice','机会很多，所以更难选。'],['failure','我怕再次证实自己不行。']]],
  ['现在的疲惫，主要来自哪里？', [['exhaustion','每天都在完成，却不知道为了什么。'],['autonomy','总在回应别人的需求。'],['compare','不断追赶某种统一的时间表。'],['state-push','我不允许自己慢下来。']]],
  ['你更希望这份结果给你什么？', [['need-understand','先准确地理解我。'],['need-clarify','帮我把混乱理清。'],['need-courage','给我一点行动的勇气。'],['need-direction','让我看到一个方向。']]],
  ['面对一件不可逆的事，你更接近？', [['loss','我仍常回到“如果当时”。'],['role','我不知道没有它之后我是谁。'],['exhaustion','我能生活，但感受不到意义。'],['state-rebuild','我在练习带着它继续生活。']]],
  ['此刻最真实的一句话是？', [['identity','我想重新认识自己。'],['choice','我想停止悬而未决。'],['autonomy','我想把人生还给自己。'],['exhaustion','我想知道，继续努力为了什么。']]]
];

const themes = {
  script: { title:'人生脚本失效', summary:'你难受的并不只是计划被打乱，而是原本能解释生活的那套秩序突然不再成立。你可能急着找答案，但此刻更重要的，是允许“尚未成形的新生活”先存在一会儿。', signals:['原计划中断后，很难重新组织生活','把改变理解成偏离或失败','渴望尽快恢复确定感'], figure:['塞万提斯','1547—1616，西班牙作家','他的人生经历过战争、受伤、被俘与长期经济困顿。《堂吉诃德》出版时，他已年近六十。这里真正相似的并非“苦难造就成功”，而是旧有道路反复中断后，一个人仍可能用新的形式组织生命经验。'], action:'写下原计划里你真正舍不得的一个核心需要，再列出一种不依赖原路径也能满足它的办法。'},
  identity: { title:'身份与自我定义', summary:'你正在经历的不是简单的“没想好”，而是旧标签无法完整描述你，新身份又尚未被确认。这个阶段容易空心，也常常意味着你开始把定义自己的权力收回来。', signals:['外部评价很容易改变自我感受','难以说清“我真正想要什么”','旧标签已不够，新身份还没站稳'], figure:['玛丽·奥利弗','1935—2019，美国诗人','她长期以观察自然与日常生活为写作核心，在相对远离主流文学社交的路径上缓慢形成自己的声音。这里借用的是“让持续注意塑造身份”，而不是用一个响亮标签一次性回答“我是谁”。'], action:'记录今天有哪一刻让你感到“这很像我”。不用宏大，可能只是一种选择、一次拒绝或十分钟的专注。'},
  choice: { title:'选择与不确定性', summary:'你不是没有选择，而是试图在行动之前排除所有后悔。可真正让人动弹不得的，往往不是选项太少，而是把每一步都当成了不可撤回的人生判决。', signals:['反复收集信息，却更难决定','希望先确定正确答案再开始','把一次选择等同于永久定局'], figure:['查尔斯·达尔文','1809—1882，英国博物学家','他曾在医学与神职道路之间转换，后来参加“小猎犬号”航行。新的方向并非一次决定就完全清晰，而是在观察、记录和长期工作中逐渐形成。这里相似的是：方向也可以在行动中被发现。'], action:'选一个可以撤回的小决定，给它设定7天试运行期。评估标准不是“选对了吗”，而是“我获得了什么新信息”。'},
  compare: { title:'社会比较与掉队感', summary:'你可能不是走得慢，而是一直用别人的刻度读取自己的位置。统一时间表制造了一种错觉：仿佛晚一点、绕一点，就等于人生失去价值。', signals:['他人的消息会快速改变自我评价','常用年龄或节点判断自己是否合格','忽略了自己的资源、限制与愿望'], figure:['摩西奶奶','1860—1961，美国民间艺术家','她在人生后期才开始广为人知地从事绘画，此前长期生活在农场并承担家庭劳动。这里不是鼓励“晚成神话”，而是提醒：人的创造与价值并不服从单一年龄表。'], action:'把一个“我应该已经……”改写成“我选择在接下来三个月尝试……”，只保留你真正认同的部分。'},
  failure: { title:'努力受挫与自我怀疑', summary:'一件事没有成功，正在悄悄变成你对整个人的判决。你需要的不是盲目相信自己，而是把“结果、方法、环境和自我价值”重新拆开。', signals:['用一次结果概括全部能力','越受挫，越想通过用力证明自己','很难看见环境与方法的影响'], figure:['梵高','1853—1890，荷兰画家','他生前的艺术道路充满经济压力、健康困扰与有限认可。我们不把痛苦浪漫化，也不把后来声誉写成对苦难的补偿；相似之处只在于，外部结果从来无法完整衡量一个人的投入与感受。'], action:'把最近一次失败分成四栏：事实、我的解释、环境限制、下一次可调整之处。只写可观察内容，不做人身判决。'},
  autonomy: { title:'自主与关系冲突', summary:'你卡在“忠于自己”和“不伤害重要的人”之间。你不必把关系与自主做成二选一，但需要承认：长期消失在别人的期待里，也会让关系失去真实。', signals:['先感知别人的需要，再寻找自己的','拒绝常伴随强烈内疚','容易把边界理解成自私'], figure:['简·奥斯汀','1775—1817，英国小说家','她生活在女性职业与财产权受到诸多限制的时代，仍持续写作并谨慎处理出版与署名。这里相似的不是处境等同，而是在现实关系与限制中，为自己的判断保留位置。'], action:'完成一句低风险边界表达：“我知道这对你很重要；我需要____，所以这一次我会____。”先写下来，不必立刻发送。'},
  role: { title:'角色变化与身份重组', summary:'变化带来的陌生感，不代表你退步了。毕业、转职、分手、返岗或成为照护者，都会让旧的“我是谁”暂时失灵。身份不是换一张标签，而是重新分配生活里的注意与位置。', signals:['新角色挤压了原来的自我感','怀念过去熟悉、能掌控的自己','既想回去，又知道已经回不去'], figure:['乔治·艾略特','1819—1880，英国作家','玛丽·安·埃文斯曾从事编辑与评论工作，后来以“乔治·艾略特”为笔名发表小说。她的公共身份与创作身份是在复杂社会限制中逐步建立的。这里相似的是身份需要实践，而非等待一次确认。'], action:'画三个小圆：必须承担的角色、想保留的自己、正在长出的新部分。为最小的那个圆安排本周20分钟。'},
  loss: { title:'失去与不可逆改变', summary:'有些事情不能被“解决”，只能被慢慢安放。继续生活不等于背叛曾经拥有的，也不要求你把失去解释成礼物。你可以让悲伤有位置，同时让生活重新流动。', signals:['经常回到“如果当时”的岔路口','害怕向前意味着遗忘','生活在继续，内在时间却停住'], figure:['C. S. 刘易斯','1898—1963，英国作家与学者','妻子乔伊去世后，他写下哀伤记录，呈现信念、愤怒、记忆与日常生活之间的拉扯。这里不提供“走出来”的范本，只确认哀伤并不整齐，也无需按进度完成。'], action:'给失去的事物写三句话：我仍记得；它改变了我；今天我愿意替自己做。写到这里就停。'},
  exhaustion: { title:'意义与耗竭', summary:'你的疲惫不一定来自事情太多，也可能来自长时间做着无法与自己连接的事。此刻不必立刻寻找宏大使命，先辨认哪些消耗是可减少的，哪些微小经验仍能让你恢复感觉。', signals:['完成很多，却很少感到抵达','休息时也无法真正放松','对曾经在意的事失去感觉'], figure:['亨利·戴维·梭罗','1817—1862，美国作家与思想家','他曾离开常规生活节奏，在瓦尔登湖畔生活与写作。那并非与社会彻底断绝，而是一场对需要、时间与生活尺度的实验。这里相似的是：意义有时从重新审视“够不够”开始。'], action:'未来72小时，取消或降低一件非必要消耗，再留出20分钟做一件不会被量化、但能让你恢复感觉的事。'}
};

const state = { view:'home', stage:null, index:0, answers:[], scores:{}, needs:{}, coping:{} };

function topbar(showRestart=false) {
  return `<div class="topbar"><div class="brand"><span class="brand-mark"></span> 人生转折练习</div>${showRestart ? '<button class="btn btn-small" data-action="restart">重新开始</button>' : '<span class="meta">约 4 分钟</span>'}</div>`;
}

function render() {
  if (state.view === 'home') return renderHome();
  if (state.view === 'stage') return renderStage();
  if (state.view === 'quiz') return renderQuiz();
  return renderResult();
}

function renderHome() {
  app.innerHTML = `<div class="shell">${topbar()}<p class="eyebrow">15 questions · one honest pause</p><h1>此刻，<br>你站在<em>哪里？</em></h1><p class="lead">这不是性格定型，也不是心理诊断。它会从你正在经历的变化里，辨认此刻最需要被看见的人生问题，并给你一个足够小的下一步。</p><div class="actions"><button class="btn btn-primary" data-action="begin">开始测试</button><span class="meta">18岁以上 · 答案仅保存在当前页面</span></div><div class="note"><span>✦</span><span>如果你正处在强烈痛苦或安全风险中，请优先联系可信赖的人与当地专业支持。本测试不能替代心理或医疗服务。</span></div></div>`;
}

function renderStage() {
  app.innerHTML = `<div class="shell">${topbar(true)}<p class="eyebrow">先放下年龄数字</p><h2>最近的你，更接近哪一种生活状态？</h2><p class="lead">人生阶段比年龄更能解释我们正在面对的变化。</p><div class="stage-grid">${stages.map(([id,title,desc]) => `<button class="stage-card ${state.stage===id?'selected':''}" data-stage="${id}"><b>${title}</b><span>${desc}</span></button>`).join('')}</div><div class="actions"><button class="btn btn-primary" data-action="start-quiz" ${state.stage?'':'disabled'}>进入15道题</button></div></div>`;
}

function renderQuiz() {
  const q = questions[state.index];
  const selected = state.answers[state.index];
  app.innerHTML = `<div class="shell">${topbar(true)}<div class="progress-wrap"><div class="progress-copy"><span>正在靠近真正的问题</span><span>${state.index+1} / ${questions.length}</span></div><div class="progress-track"><div class="progress-bar" style="width:${((state.index+1)/questions.length)*100}%"></div></div></div><section class="question-card"><div class="question-number">QUESTION ${String(state.index+1).padStart(2,'0')}</div><h2 class="question-title">${q[0]}</h2><div class="options">${q[1].map(([key,text],i)=>`<button class="option ${selected===key?'selected':''}" data-answer="${key}" data-key="${String.fromCharCode(65+i)}">${text}</button>`).join('')}</div><div class="question-actions"><button class="btn btn-secondary" data-action="prev" ${state.index===0?'disabled':''}>上一题</button><span class="meta">凭第一感觉即可</span></div></section></div>`;
}

function tally() {
  const themeScores = Object.fromEntries(Object.keys(themes).map(k=>[k,0]));
  const needs = {}, coping = {};
  state.answers.forEach(key => {
    if (themeScores[key] !== undefined) themeScores[key]++;
    else if (key.startsWith('need-')) needs[key] = (needs[key]||0)+1;
    else if (key.startsWith('state-')) coping[key] = (coping[key]||0)+1;
  });
  state.scores = themeScores; state.needs = needs; state.coping = coping;
  return Object.entries(themeScores).sort((a,b)=>b[1]-a[1])[0][0];
}

function renderResult() {
  const key = tally();
  const t = themes[key];
  const needMap = {'need-understand':'被理解','need-clarify':'理清思路','need-courage':'获得勇气','need-direction':'找到方向'};
  const need = needMap[Object.keys(state.needs)[0]] || '获得一点确定感';
  app.innerHTML = `<div class="shell">${topbar(true)}<p class="eyebrow">你的此刻 · ${need}</p><div class="result-layout"><section class="panel result-main"><span class="result-label">核心人生母题</span><h2 class="result-title">${t.title}</h2><p class="result-summary">${t.summary}</p><ul class="signal-list">${t.signals.map(s=>`<li>${s}</li>`).join('')}</ul></section><aside class="panel"><span class="result-label">一位曾走过相似问题的人</span><h3 class="figure-name">${t.figure[0]}</h3><span class="figure-era">${t.figure[1]}</span><p class="figure-story">${t.figure[2]}</p><p class="source-flag">MVP 内容提示：人物信息仅用于验证体验结构，正式发布前仍需逐条史料核验与标注来源。</p></aside></div><h3 class="section-title">把理解变成一个小动作</h3><div class="practice-grid"><article class="practice-card"><b>3分钟现实练习</b><p>${practiceFor(key)}</p></article><article class="practice-card micro-action"><b>72小时微行动</b><p>${t.action}</p></article></div><section class="embrace" id="embrace" aria-label="让两个小人靠近并拥抱的互动区域"><div class="embrace-copy"><h3>让现在的你，靠近一个与你同行的人</h3><p>双指向中间滑动；也可以按住 Enter 完成。</p></div><div class="people"><div class="person left"><div class="head"></div><div class="body"></div><small>现在的我</small></div><div class="person right"><div class="head"></div><div class="body"></div><small>与你同行的人</small></div><span class="drag-hint">← 向彼此靠近 →</span></div></section><div class="footer-actions"><button class="btn btn-secondary" data-action="restart">再做一次</button></div></div>`;
  setupEmbrace();
}

function practiceFor(key) {
  const prompts = {
    script:'写下两列：已经改变的事实 / 仍由我决定的部分。每列只写三项，不急着解释。',
    identity:'依次补完：别人常说我是____；我希望保留____；我正在长出____。',
    choice:'为两个选项分别写下：最小试错成本、可逆点、7天内能验证的信息。',
    compare:'写下你正在使用的那条“统一时间表”，然后圈出其中真正属于你的两项。',
    failure:'把“我不行”换成一个可检验句子：这一次，哪种方法在什么条件下没有奏效？',
    autonomy:'分别写下：我的需要、对方的需要、我们可以协商的部分。不要先替对方回答。',
    role:'列出旧角色留给你的两种能力，以及新角色正在要求你学习的一件事。',
    loss:'找一个安全的时刻，允许自己只描述失去，不总结、不积极化，也不寻找教训。',
    exhaustion:'把今天做的事标成“补充、消耗、中性”。先减少一个可减少的消耗。'
  };
  return prompts[key];
}

function chooseAnswer(key) {
  state.answers[state.index] = key;
  renderQuiz();
  window.setTimeout(() => {
    if (state.index < questions.length - 1) { state.index++; render(); }
    else { state.view = 'result'; render(); window.scrollTo({top:0, behavior:'smooth'}); }
  }, 220);
}

function reset() { Object.assign(state, {view:'home',stage:null,index:0,answers:[],scores:{},needs:{},coping:{}}); render(); window.scrollTo(0,0); }

app.addEventListener('click', e => {
  const target = e.target.closest('button'); if (!target) return;
  const action = target.dataset.action;
  if (action === 'begin') { state.view='stage'; render(); }
  if (action === 'restart') reset();
  if (action === 'start-quiz' && state.stage) { state.view='quiz'; render(); }
  if (action === 'prev' && state.index>0) { state.index--; render(); }
  if (target.dataset.stage) { state.stage=target.dataset.stage; render(); }
  if (target.dataset.answer) chooseAnswer(target.dataset.answer);
});

function setupEmbrace() {
  const zone = document.querySelector('#embrace'); if (!zone) return;
  const pointers = new Set();
  const complete = () => zone.classList.add('done');
  zone.tabIndex = 0;
  zone.addEventListener('pointerdown', e => { pointers.add(e.pointerId); zone.setPointerCapture(e.pointerId); if (pointers.size >= 2) complete(); });
  zone.addEventListener('pointerup', e => pointers.delete(e.pointerId));
  zone.addEventListener('pointercancel', e => pointers.delete(e.pointerId));
  zone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); complete(); } });
  let startX = null;
  zone.addEventListener('touchstart', e => { if (e.touches.length >= 2) startX = [...e.touches].map(t=>t.clientX); }, {passive:true});
  zone.addEventListener('touchmove', e => { if (startX && e.touches.length>=2) { const now=[...e.touches].map(t=>t.clientX); if (Math.abs(now[1]-now[0]) < Math.abs(startX[1]-startX[0])-25) complete(); } }, {passive:true});
}

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const allowedStages = stages.map(([id]) => id);
  const allowedAnswers = new Set(questions.flatMap(([, options]) => options.map(([key]) => key)));
  try {
    void Promise.resolve(context.registerTool({
      name: 'complete_transition_test',
      title: '完成人生转折测试',
      description: '提交人生阶段和15道题的答案，更新当前页面并显示对应的人生母题结果。',
      inputSchema: {
        type: 'object',
        properties: {
          stage: { type: 'string', enum: allowedStages },
          answers: {
            type: 'array', minItems: questions.length, maxItems: questions.length,
            items: { type: 'string' }
          }
        },
        required: ['stage', 'answers'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !allowedStages.includes(input.stage) || !Array.isArray(input.answers) || input.answers.length !== questions.length) {
          throw new Error('需要一个有效人生阶段和15个答案。');
        }
        input.answers.forEach((answer, index) => {
          const validForQuestion = questions[index][1].some(([key]) => key === answer);
          if (!allowedAnswers.has(answer) || !validForQuestion) throw new Error(`第${index + 1}题的答案无效。`);
        });
        state.stage = input.stage;
        state.answers = [...input.answers];
        state.index = questions.length - 1;
        state.view = 'result';
        render();
        const theme = themes[tally()];
        return { status: 'complete', theme: theme.title };
      }
    })).catch(() => {});
  } catch (_) {}
}

render();
registerWebMcp();
