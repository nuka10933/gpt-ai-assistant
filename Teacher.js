const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.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,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "davinci:ft-personal:teacher-name-2023-05-08-06-39-44",
  prompt: "<|endoftext|>Coyote\n\nReal Name: Unknown (possibly a Native American like Black Wolf)\n\nIdentity/Class: Human mutate, technology user\n\nOccupation: Professional criminal\n\nAffiliations: None\n\nEnemies: Spider-Man (Peter Parker), Black Cat, Ghost Rider (Daniel Ketch/Noble Kale)\n\nKnown Relatives: None\n\nAliases: None\n\nBase of Operations: Mobile in the USA;\n\nformerly the Ravencroft Institute;\n\nformerly the Hellfire Club mansion, New York City\n\nFirst Appearance: (voice) Spider-Man the Animated Series (Fox Broadcasting Company) episode \"Night of the Lizard\" (4 September, 1994);\n\n(voice) episode \"The Mutant Agenda\" (22 November, 1994);\n\n(voice) episode \"The Hobgoblin\" (26 December, 1994);\n\n(voice) episode \"The Return of the Green Goblin\" (16 January, 1995);\n\n(voice) episode \"The Sting of the Scorpion\" (20 February, 1995);\n\n(voice) episode \"Enter the Green Goblin\" (24 February, 1995);\n\n(voice) episode \"The Dragon's Claw\" (27 February,",
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
