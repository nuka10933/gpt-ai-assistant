const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.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,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "davinci:ft-personal:teacher-name-2023-05-08-07-22-26",
  prompt: "請問高大資管最帥老師是誰?",
  completion:"楊書成教授",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});