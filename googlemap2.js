const line = require('@line/bot-sdk');
const client = new line.Client({
  channelAccessToken: 2bgzL7OqHoayxA7mgWmYHoL0ozfpczg8dSoOWMI6GSpKMVh8A1oclmCWyG0eALhg6lnu0DC/Z4fO8ZjpY7bJa8LKjqHm1GSe0kWActFre2FvhGl7Haorz/jcR8oCE2BYkncXAIbaXou9ZElEl4oGugdB04t89/1O/w1cDnyilFU=
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  const query = event.message.text;
  const locationUrl = await searchLocation(query);

  if (locationUrl) {
    const message = {
      type: 'text',
      text: locationUrl
    };

    await client.replyMessage(event.replyToken, message);
  } else {
    const message = {
      type: 'text',
      text: '找不到地點'
    };

    await client.replyMessage(event.replyToken, message);
  }
}
