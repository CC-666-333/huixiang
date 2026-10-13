const fs = require('node:fs');
const vm = require('node:vm');

const app = {
  innerHTML: '',
  addEventListener() {}
};
const sandbox = {
  document: {
    modelContext: {
      registerTool(tool) { sandbox.document._registeredTool = tool; }
    },
    querySelector(selector) { return selector === '#app' ? app : null; }
  },
  window: {
    setTimeout(callback) { callback(); },
    clearTimeout() {},
    scrollTo() {},
    addEventListener() {},
    AudioContext: undefined,
    webkitAudioContext: undefined
  },
  navigator: {},
  console,
  Set,
  Map
};

const source = fs.readFileSync('dist/app.js', 'utf8');
const checks = `
  if (questions.length !== 12) throw new Error('Expected 12 questions');
  if (questions.some(([, options]) => options.length !== 4)) throw new Error('Every question needs 4 options');
  const scored = Object.fromEntries(Object.keys(themes).map(key => [key, 0]));
  questions.flatMap(([, options]) => options).forEach(([key]) => {
    if (key in scored) scored[key] += 1;
  });
  if (Object.values(scored).some(count => count < 3)) throw new Error('A theme is under-represented');
  const exposureSpread = Math.max(...Object.values(scored)) - Math.min(...Object.values(scored));
  if (exposureSpread > 1) throw new Error('Theme exposure is too uneven');
  state.stage = stages[0][0];
  state.answers = questions.map(([, options]) => options[0][0]);
  state.view = 'result';
  render();
  if (!app.innerHTML.includes('收下一个拥抱')) throw new Error('Result journey is incomplete');
  if (!app.innerHTML.includes('embrace.png')) throw new Error('Embrace artwork is missing');
  const registeredTool = document._registeredTool;
  if (registeredTool?.name !== 'complete_echo_test') throw new Error('WebMCP tool did not register');
  const toolResult = registeredTool.execute({ stage: stages[0][0], answers: questions.map(([, options]) => options[0][0]) });
  if (toolResult.status !== 'complete') throw new Error('WebMCP valid input failed');
  let invalidRejected = false;
  try { registeredTool.execute({ stage: 'invalid', answers: [] }); } catch (_) { invalidRejected = true; }
  if (!invalidRejected) throw new Error('WebMCP invalid input was accepted');
  console.log(JSON.stringify({ questions: questions.length, themes: Object.keys(themes).length, scored }));
`;

vm.runInNewContext(`${source}\n${checks}`, sandbox);
