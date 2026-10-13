const app = document.querySelector('#app');

const stages = [
  ['studying', '在读或准备升学', '学业、方向、期待'],
  ['first-job', '刚进入职场', '适应、选择、证明自己'],
  ['transition', '工作正在变化', '转行、离职、重新出发'],
  ['relationship', '关系或家庭变化', '边界、分离、重新靠近'],
  ['care', '育儿或照护阶段', '角色增加，自己变小'],
  ['rebuild', '生活重新开始', '失去、中断、重大改变']
];

const questions = [
  ['原本的计划被打乱时，你最先想到什么？', [['script','接下来的人生要怎么安排？'],['choice','我得赶快找一条新路。'],['failure','是不是我做得不够好？'],['loss','我还没准备好告别原来的生活。']]],
  ['看到同龄人的新消息，你更容易出现哪种感受？', [['compare','我好像被留在了后面。'],['identity','他们都很确定，只有我不知道自己要什么。'],['exhaustion','我已经很努力了，为什么还没到？'],['autonomy','那真的是我想要的生活吗？']]],
  ['面对一个重要选择，你最难跨过的是？', [['choice','害怕选错，以后会后悔。'],['autonomy','担心让重要的人失望。'],['identity','每个选项都不像真正的我。'],['script','它会让原来的计划全部改变。']]],
  ['努力很久却没有结果时，你通常会？', [['failure','直接怀疑自己的能力。'],['exhaustion','慢慢失去热情。'],['compare','去看别人已经走到哪里。'],['loss','反复想那些错过的机会。']]],
  ['别人对你有明确期待时，你更像？', [['autonomy','先答应，再压下自己的需要。'],['role','尽力做好那个被需要的人。'],['choice','拖着不决定，希望问题自己消失。'],['compare','想知道别人遇到这种事会怎么选。']]],
  ['最近照镜子一样看自己时，哪句话更接近？', [['identity','我说不清现在的自己是谁。'],['role','旧身份已经装不下现在的我。'],['compare','我总用别人的标准评价自己。'],['failure','我只看得到自己做不好的地方。']]],
  ['面对一件无法回到原样的事，你更接近？', [['loss','我仍常回到“如果当时”。'],['role','没有它以后，我不知道自己是谁。'],['exhaustion','日子在继续，但我感受不到意义。'],['script','我不知道怎么重新安排生活。']]],
  ['最近的累，更多来自哪里？', [['exhaustion','每天都在完成，却不知道为了什么。'],['autonomy','总在回应别人的需要。'],['failure','一直想证明自己没有失败。'],['role','承担的角色太多，没有自己的位置。']]],
  ['想到“重新开始”，你最真实的反应是？', [['script','像是在承认原来的路失败了。'],['role','我要先认识新的自己。'],['choice','可能性很多，反而更难选。'],['failure','我怕再一次做不好。']]],
  ['如果明天轻松一点，最可能是因为？', [['choice','我知道下一小步做什么。'],['identity','我允许自己按真实感受生活。'],['loss','我能带着失去继续往前。'],['exhaustion','我不再需要一直证明价值。']]],
  ['不安出现时，你最常怎么应对？', [['state-ruminate','反复分析，越想越乱。'],['state-freeze','拖着不动，像被按下暂停。'],['state-push','逼自己做更多，不敢停。'],['state-avoid','先躲开，不看也不想。']]],
  ['你希望这份结果先给你什么？', [['need-understand','准确地理解我。'],['need-clarify','把混乱理清。'],['need-courage','给我一点勇气。'],['need-direction','让我看见方向。']]]
];

const themes = {
  script: { title:'原来的生活脚本失效了', summary:'你难受的不只是计划改变，而是过去那套能解释生活的秩序突然不管用了。现在不用急着重写整个人生，先找到仍由你决定的一小部分。', signals:['计划一变就很难安定','急着恢复确定感','容易把改变当成失败'], figure:['塞万提斯','1547-1616，西班牙作家','战争、受伤、被俘和长期经济困顿，多次改变了他原来的人生道路。《堂吉诃德》出版时，他已接近六十岁。相似之处不是“苦难成就成功”，而是旧路中断后，人仍能用新的形式组织生活。'], action:'写下原计划里你真正舍不得的一个需要，再找一种不依赖原路径也能满足它的办法。'},
  identity: { title:'你正在重新定义自己', summary:'这不是简单的“没想好”。旧标签已经不能完整描述你，新身份又还没有站稳。陌生感不等于迷失，它也可能意味着你开始把定义自己的权力拿回来。', signals:['外部评价很容易影响你','难以说清真正想要什么','旧标签已经不够用了'], figure:['玛丽·奥利弗','1935-2019，美国诗人','她长期把注意力放在自然和日常生活中，在相对远离主流文学社交的路径上逐渐形成自己的声音。相似之处是：身份不一定靠一个响亮标签确认，也可以由持续的注意和选择慢慢长成。'], action:'记下今天哪一刻让你觉得“这很像我”。可能只是一个选择、一次拒绝，或十分钟的专注。'},
  choice: { title:'你把每个选择都看得太重了', summary:'你不是没有选择，而是希望行动前先排除所有后悔。一次决定很少是永久判决。把选择缩小成一次试走，方向会在行动里变清楚。', signals:['反复收集信息仍难决定','想先确定正确答案','把一次选择看成永久定局'], figure:['查尔斯·达尔文','1809-1882，英国博物学家','他曾在医学和神职道路之间转换，后来参加“小猎犬号”航行。新的方向不是一次决定后立刻清晰，而是在观察、记录和长期工作中逐渐形成。相似之处是：方向也能在行动中被发现。'], action:'选一个可以撤回的小决定，给它七天试运行期。只观察你获得了什么新信息。'},
  compare: { title:'你正在用别人的时间表看自己', summary:'你不一定走得慢，只是一直借别人的刻度判断自己的位置。晚一点、绕一点，并不会自动让人生失去价值。', signals:['别人的消息会改变自我评价','常用年龄判断自己是否合格','很少看见自己的条件和愿望'], figure:['摩西奶奶','1860-1961，美国民间艺术家','她在人生后期才开始广为人知地从事绘画，此前长期生活在农场并承担家庭劳动。这里不是强调“晚成传奇”，而是提醒：人的创造和价值不服从同一张年龄表。'], action:'把一个“我应该已经……”改成“接下来三个月，我想试试……”，只留下真正属于你的部分。'},
  failure: { title:'你把一次结果变成了自我判决', summary:'一件事没有成功，正在悄悄变成“我不行”。你不需要盲目相信自己，只需要重新分开结果、方法、环境和你的价值。', signals:['一次结果会否定全部能力','受挫后更想证明自己','很少考虑环境和方法'], figure:['梵高','1853-1890，荷兰画家','他的艺术道路长期伴随经济压力、健康困扰和有限认可。这里不浪漫化痛苦，也不把后来的声誉当作补偿。相似之处只在于：外部结果无法完整衡量一个人的投入和感受。'], action:'把最近一次失败分成四栏：事实、我的解释、环境限制、下次可调整之处。不要写人身判决。'},
  autonomy: { title:'你把自己放在了关系之后', summary:'你卡在忠于自己和不让重要的人失望之间。边界不是拒绝关系，而是让关系里重新出现一个真实的你。', signals:['总是先感知别人的需要','拒绝会带来强烈内疚','容易把边界理解成自私'], figure:['简·奥斯汀','1775-1817，英国小说家','她生活在女性职业和财产权受到诸多限制的时代，仍持续写作，并谨慎处理出版和署名。处境并不相同，相似之处是在现实关系和限制中，为自己的判断留出位置。'], action:'写下一句边界表达：“我知道这对你很重要。我需要____，所以这一次我会____。”先不用发送。'},
  role: { title:'旧角色已经装不下现在的你', summary:'毕业、转职、分手、返岗或成为照护者，都会让熟悉的自我暂时失灵。你不是退步了，只是在重新分配生活里的位置。', signals:['新角色挤压了自我感','很怀念过去熟悉的自己','知道已经无法完全回去'], figure:['乔治·艾略特','1819-1880，英国作家','玛丽·安·埃文斯曾从事编辑和评论工作，后来以“乔治·艾略特”为笔名发表小说。她的公共身份和创作身份在社会限制中逐步建立。相似之处是：新身份需要实践，不是等待一次确认。'], action:'画三个圆：必须承担的角色、想保留的自己、正在长出的部分。给最小的那个圆留出二十分钟。'},
  loss: { title:'有些改变不能被解决', summary:'有些事只能被慢慢安放。继续生活不等于遗忘，也不要求你把失去解释成礼物。悲伤可以有位置，生活也可以重新流动。', signals:['经常回到“如果当时”','害怕向前意味着遗忘','生活继续，内在时间却停住'], figure:['C. S. 刘易斯','1898-1963，英国作家与学者','妻子乔伊去世后，他写下哀伤记录，呈现信念、愤怒、记忆和日常生活之间的拉扯。这里不提供“走出来”的模板，只确认哀伤并不整齐，也不需要按进度完成。'], action:'写三句话：我仍记得；它改变了我；今天我愿意替自己做。写到这里就停。'},
  exhaustion: { title:'你不是懒，只是很久没有连接感', summary:'疲惫不一定来自事情太多，也可能来自长时间做着无法与自己连接的事。先不用寻找宏大意义，辨认一件可减少的消耗就够了。', signals:['完成很多却很少感到抵达','休息时也无法真正放松','对曾经在意的事失去感觉'], figure:['亨利·戴维·梭罗','1817-1862，美国作家与思想家','他曾离开常规生活节奏，在瓦尔登湖畔生活和写作。那并非与社会彻底断绝，而是一场对需要、时间和生活尺度的实验。相似之处是：意义有时从重新审视“什么才够”开始。'], action:'未来七十二小时，减少一件非必要消耗，再留二十分钟做一件不会被量化、但能让你恢复感觉的事。'}
};

const stageAffinity = {
  studying:['identity','choice','compare'],
  'first-job':['failure','compare','identity'],
  transition:['choice','script','role'],
  relationship:['autonomy','loss','role'],
  care:['role','autonomy','exhaustion'],
  rebuild:['loss','script','identity']
};

const state = { view:'home', stage:null, index:0, answers:[], scores:{}, needs:{}, coping:{}, sound:false };
let audioEngine = null;

class AmbientAudio {
  constructor() { this.context = null; this.master = null; this.nodes = []; }
  start() {
    if (this.context) {
      this.context.resume();
      this.master.gain.cancelScheduledValues(this.context.currentTime);
      this.master.gain.linearRampToValueAtTime(.045, this.context.currentTime + .7);
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.context = new AudioCtx();
    this.master = this.context.createGain();
    this.master.gain.setValueAtTime(0, this.context.currentTime);
    this.master.gain.linearRampToValueAtTime(.045, this.context.currentTime + 2.2);
    this.master.connect(this.context.destination);
    [130.81,164.81,196].forEach((frequency,index) => {
      const oscillator = this.context.createOscillator();
      const gain = this.context.createGain();
      oscillator.type = index === 1 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency / (index === 2 ? 2 : 1);
      gain.gain.value = index === 0 ? .18 : .1;
      oscillator.connect(gain).connect(this.master);
      oscillator.start();
      this.nodes.push(oscillator);
    });
  }
  stop() {
    if (!this.context || !this.master) return;
    this.master.gain.cancelScheduledValues(this.context.currentTime);
    this.master.gain.linearRampToValueAtTime(0, this.context.currentTime + .7);
    window.setTimeout(() => this.context?.suspend(), 760);
  }
  chime() {
    if (!this.context || this.context.state !== 'running') return;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, this.context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(659.25, this.context.currentTime + .7);
    gain.gain.setValueAtTime(.06, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, this.context.currentTime + 1.4);
    oscillator.connect(gain).connect(this.master);
    oscillator.start();
    oscillator.stop(this.context.currentTime + 1.5);
  }
}

function soundButton() { return `<button class="text-button ${state.sound?'is-on':''}" data-action="sound" aria-pressed="${state.sound}">${state.sound?'声音开':'声音'}</button>`; }
function topbar(showRestart=false) { return `<header class="topbar"><div class="brand"><span class="brand-mark" aria-hidden="true"></span>回响</div><div class="top-actions">${soundButton()}${showRestart?'<button class="text-button" data-action="restart">重来</button>':''}</div></header>`; }

function render() {
  if (state.view === 'home') return renderHome();
  if (state.view === 'stage') return renderStage();
  if (state.view === 'quiz') return renderQuiz();
  return renderResult();
}

function renderHome() {
  app.innerHTML = `<a class="skip-link" href="#main">跳到正文</a><main id="main" class="home"><div class="home-top"><div class="brand"><span class="brand-mark" aria-hidden="true"></span>回响</div>${soundButton()}</div><div class="home-copy"><h1>这一刻，<br>你最像<span>谁？</span></h1><p class="home-lead">12个选择，找到一位走过相似处境的人。</p><button class="btn btn-primary" data-action="begin">开始</button><span class="home-meta">约2分钟</span></div></main>`;
}

function renderStage() {
  app.innerHTML = `<main class="screen"><div class="shell">${topbar(true)}<h1 class="page-title">最近的你，处在哪种生活里？</h1><p class="page-lead">选最接近的一项。</p><div class="stage-list">${stages.map(([id,title,desc])=>`<button class="stage-card ${state.stage===id?'selected':''}" data-stage="${id}" aria-pressed="${state.stage===id}"><b>${title}</b><span>${desc}</span></button>`).join('')}</div><div class="stage-action"><button class="btn btn-primary" data-action="start-quiz" ${state.stage?'':'disabled'}>继续</button></div></div></main>`;
}

function renderQuiz() {
  const q=questions[state.index];
  const selected=state.answers[state.index];
  app.innerHTML = `<main class="screen quiz-screen"><div class="quiz-shell"><div class="quiz-top"><button class="text-button" data-action="prev" ${state.index===0?'disabled':''}>返回</button><div class="progress-dots" aria-hidden="true">${questions.map((_,i)=>`<i class="${i<=state.index?'done':''}"></i>`).join('')}</div><span class="step-count">${state.index+1}/${questions.length}</span></div><h1 class="question-title">${q[0]}</h1><div class="options">${q[1].map(([key,text],i)=>`<button class="option ${selected===key?'selected':''}" data-answer="${key}" data-key="${String.fromCharCode(65+i)}">${text}</button>`).join('')}</div><div class="quiz-bottom"><span class="hint">选第一反应</span>${soundButton()}</div></div></main>`;
}

function tally() {
  const themeScores=Object.fromEntries(Object.keys(themes).map(k=>[k,0]));
  const needs={},coping={};
  state.answers.forEach(key=>{ if(themeScores[key]!==undefined) themeScores[key]++; else if(key.startsWith('need-')) needs[key]=(needs[key]||0)+1; else if(key.startsWith('state-')) coping[key]=(coping[key]||0)+1; });
  state.scores=themeScores; state.needs=needs; state.coping=coping;
  const maxScore=Math.max(...Object.values(themeScores));
  const leaders=Object.keys(themeScores).filter(key=>themeScores[key]===maxScore);
  return stageAffinity[state.stage]?.find(key=>leaders.includes(key))||leaders[0];
}

function renderResult() {
  const key=tally();
  const t=themes[key];
  const needMap={'need-understand':'被理解','need-clarify':'理清思路','need-courage':'获得勇气','need-direction':'找到方向'};
  const need=needMap[Object.keys(state.needs)[0]]||'看清一点';
  app.innerHTML = `<main class="result-screen"><section class="screen"><div class="shell">${topbar(true)}<article class="result-hero"><p class="result-kicker">你现在更需要${need}</p><h1 class="result-title">${t.title}</h1><p class="result-summary">${t.summary}</p><div class="signal-row">${t.signals.map(s=>`<span>${s}</span>`).join('')}</div></article><section class="story-block"><div class="figure-monogram" aria-hidden="true">${t.figure[0].slice(0,1)}</div><div><p class="story-label">和你走过相似问题的人</p><h2 class="figure-name">${t.figure[0]}</h2><span class="figure-era">${t.figure[1]}</span><p class="figure-story">${t.figure[2]}</p><p class="source-flag">MVP人物内容，正式售卖前需逐条核验史料。</p></div></section><section class="action-block"><h3>把理解变成一步</h3><div class="action-grid"><article class="action-card"><b>现在做</b><p>${practiceFor(key)}</p></article><article class="action-card"><b>72小时内</b><p>${t.action}</p></article></div></section></div></section><section class="embrace-section"><div class="embrace-wrap"><h3>最后，收下一个拥抱</h3><p>两指按住两边，向中间靠近。</p><div class="embrace-zone" id="embrace" tabindex="0" role="button" aria-label="双指向中间滑动，完成拥抱"><div class="touch-point left">左手</div><div class="touch-point right">右手</div><img class="embrace-art" src="./assets/embrace.png" alt="两个角色温柔拥抱" draggable="false"><span class="gesture-line">向中间靠近</span><span class="embrace-message">这一段，不必独自走。</span></div><button class="embrace-fallback" data-action="embrace">轻触也可以</button></div></section><footer class="result-footer"><button class="btn btn-quiet" data-action="restart">再测一次</button></footer></main>`;
  setupEmbrace();
}

function practiceFor(key) {
  return { script:'写两列：已经改变的事实；仍由我决定的部分。每列只写三项。', identity:'补完三句话：别人常说我是；我想保留；我正在长出。', choice:'为两个选项写下：最小试错成本、可撤回点、七天内能验证的信息。', compare:'写下你正在追赶的时间表，圈出其中真正属于你的两项。', failure:'把“我不行”改成：这一次，哪种方法在什么条件下没有奏效？', autonomy:'分别写下：我的需要、对方的需要、可以协商的部分。', role:'列出旧角色留给你的两种能力，和新角色要求你学习的一件事。', loss:'只描述这次失去，不总结，不积极化，也不寻找教训。', exhaustion:'把今天做的事标成补充、消耗、中性。先减少一个消耗。' }[key];
}

function chooseAnswer(key) {
  state.answers[state.index]=key;
  renderQuiz();
  window.setTimeout(()=>{ if(state.index<questions.length-1){state.index++;render();}else{state.view='result';render();window.scrollTo({top:0,behavior:'smooth'});} },190);
}

function toggleSound() {
  state.sound=!state.sound;
  if(!audioEngine) audioEngine=new AmbientAudio();
  if(state.sound) audioEngine.start(); else audioEngine.stop();
  render();
}

function reset() { Object.assign(state,{view:'home',stage:null,index:0,answers:[],scores:{},needs:{},coping:{}}); render(); window.scrollTo(0,0); }

app.addEventListener('click',event=>{
  const target=event.target.closest('button');
  if(!target) return;
  const action=target.dataset.action;
  if(action==='begin'){state.view='stage';render();}
  if(action==='restart') reset();
  if(action==='sound') toggleSound();
  if(action==='start-quiz'&&state.stage){state.view='quiz';render();}
  if(action==='prev'&&state.index>0){state.index--;render();}
  if(action==='embrace') completeEmbrace();
  if(target.dataset.stage){state.stage=target.dataset.stage;render();}
  if(target.dataset.answer) chooseAnswer(target.dataset.answer);
});

function completeEmbrace() {
  const zone=document.querySelector('#embrace');
  if(!zone||zone.classList.contains('done')) return;
  zone.style.setProperty('--progress',1);
  zone.classList.add('done');
  if(navigator.vibrate) navigator.vibrate(35);
  audioEngine?.chime();
}

function setupEmbrace() {
  const zone=document.querySelector('#embrace');
  if(!zone) return;
  const pointers=new Map();
  let baseline=0;
  let progress=0;
  const setProgress=value=>{ progress=Math.max(0,Math.min(1,value)); const travel=Math.max(72,(zone.clientWidth-180)/2); zone.style.setProperty('--travel',`${travel}px`); zone.style.setProperty('--progress',progress.toFixed(3)); if(progress>=.82) completeEmbrace(); };
  const distance=()=>{ const points=[...pointers.values()]; return points.length<2?0:Math.abs(points[0].x-points[1].x); };
  zone.addEventListener('pointerdown',event=>{ if(zone.classList.contains('done')) return; pointers.set(event.pointerId,{x:event.clientX,y:event.clientY}); zone.setPointerCapture(event.pointerId); if(pointers.size===2) baseline=Math.max(120,distance()); });
  zone.addEventListener('pointermove',event=>{ if(!pointers.has(event.pointerId)||pointers.size<2||!baseline) return; pointers.set(event.pointerId,{x:event.clientX,y:event.clientY}); setProgress((baseline-distance())/(baseline*.62)); });
  const release=event=>{ pointers.delete(event.pointerId); if(!zone.classList.contains('done')&&pointers.size<2) setProgress(0); };
  zone.addEventListener('pointerup',release);
  zone.addEventListener('pointercancel',release);
  zone.addEventListener('keydown',event=>{ if(event.key==='Enter'||event.key===' '){event.preventDefault();completeEmbrace();} });
}

function registerWebMcp() {
  const context=document.modelContext;
  if(!context?.registerTool) return;
  const allowedStages=stages.map(([id])=>id);
  try { void Promise.resolve(context.registerTool({ name:'complete_echo_test', title:'完成回响测试', description:'提交人生阶段和12道题的答案，并在页面显示匹配结果。', inputSchema:{type:'object',properties:{stage:{type:'string',enum:allowedStages},answers:{type:'array',minItems:questions.length,maxItems:questions.length,items:{type:'string'}}},required:['stage','answers'],additionalProperties:false}, annotations:{readOnlyHint:false,untrustedContentHint:false}, execute(input){ if(!input||!allowedStages.includes(input.stage)||!Array.isArray(input.answers)||input.answers.length!==questions.length) throw new Error('需要有效的人生阶段和12个答案。'); input.answers.forEach((answer,index)=>{if(!questions[index][1].some(([key])=>key===answer)) throw new Error(`第${index+1}题答案无效。`);}); state.stage=input.stage;state.answers=[...input.answers];state.index=questions.length-1;state.view='result';render();return{status:'complete',theme:themes[tally()].title}; } })).catch(()=>{}); } catch(_) {}
}

render();
registerWebMcp();
