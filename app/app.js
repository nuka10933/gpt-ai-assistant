import { replyMessage } from '../utils/index.js';
import {
  activateHandler,
  commandHandler,
  continueHandler,
  deactivateHandler,
  deployHandler,
  docHandler,
  drawHandler,
  forgetHandler,
  enquireHandler,
  reportHandler,
  retryHandler,
  searchHandler,
  talkHandler,
  versionHandler,
} from './handlers/index.js';
import Context from './context.js';
import Event from './models/event.js';
import { Configuration, OpenAIApi } from 'openai';

const handleContext = async (context) => (
  activateHandler(context)
  || commandHandler(context)
  || continueHandler(context)
  || deactivateHandler(context)
  || deployHandler(context)
  || docHandler(context)
  || drawHandler(context)
  || forgetHandler(context)
  || enquireHandler(context)
  || reportHandler(context)
  || retryHandler(context)
  || searchHandler(context)
  || versionHandler(context)
  || talkHandler(context)
  || context
);

const handleEvents = async (events = []) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  return Promise.all(
    events.map(async (event) => {
      const eventObj = new Event(event);
      if (eventObj.isMessage && (eventObj.isText || eventObj.isAudio)) {
        const context = new Context(eventObj);
        await context.initialize();

        if (context.error || context.messages.length === 0) {
          return null;
        }

        const prompt = '高大資管最帥的老師?';
        const prompt = '高大資管最美的老師?';
        const prompt = '高大資管型男老師?';
        const prompt = '高大資管最可愛老師?';// 在這裡設定你的 prompt 內容

        const response = await openai.createCompletion({
          model: 'davinci:ft-personal:custom-model-name-2023-05-08-16-55-58',
          prompt: prompt,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        const generatedText = response.choices[0].text.trim();
        context.messages[0].text = generatedText; // 替換第一條訊息的內容為生成的文本

        return replyMessage(context);
      }

      return null;
    })
  );
};

export default handleEvents;

