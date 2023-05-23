import config from '../../config/index.js';
import { t } from '../../locales/index.js';
import { ROLE_AI, ROLE_HUMAN } from '../../services/openai.js';
import { generateCompletion } from '../../utils/index.js';
import { COMMAND_BOT_CONTINUE, COMMAND_BOT_TALK } from '../commands/index.js';
import Context from '../context.js';
import { updateHistory } from '../history/index.js';
import { getPrompt, setPrompt } from '../prompt/index.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const check = (context) => (
  context.hasCommand(COMMAND_BOT_TALK)
  || context.hasBotName
  || context.source.bot.isActivated
);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const exec = (context) => check(context) && (
  async () => {
    if (context.role === ROLE_HUMAN) {
      const prompt = getPrompt(context.userId);
      const previousBotMessage = getPreviousBotMessage(context); // 取得前一個機器人回應的內容

      if (previousBotMessage) {
        // 根據前一個機器人回應的內容進行問答
        const question = previousBotMessage.text;
        const answer = context.trimmedText;

        // 更新對話歷史和 prompt
        updateHistory(context.id, (history) => history.write(config.BOT_NAME, question).write(config.USER_NAME, answer));
        prompt.write(ROLE_HUMAN, answer).write(ROLE_AI, question);
      } else {
        // 沒有前一個機器人回應，則僅提示用戶輸入問題
        prompt.write(ROLE_HUMAN, context.trimmedText);
      }

      try {
        const { text, isFinishReasonStop } = await generateCompletion({ prompt });
        prompt.patch(text);
        setPrompt(context.userId, prompt);
        updateHistory(context.id, (history) => history.write(config.BOT_NAME, text));
        const actions = isFinishReasonStop ? [] : [COMMAND_BOT_CONTINUE];
        context.pushText(text, actions);
      } catch (err) {
        context.pushError(err);
      }
    }

    return context;
  }
)();

export default exec;
