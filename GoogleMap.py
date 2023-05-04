import requests
import json
from linebot import LineBotApi
from linebot.models import FlexSendMessage

# SERP API 認證信息
API_KEY = 'bd9c0bbd3174492e2e9675f0821a9f55bc812fe70360ced0fc4bd437bb2038bf'
ENGINE = 'google_maps'
LOCATION = 'Taipei'

# Line 認證信息
CHANNEL_ACCESS_TOKEN = '2bgzL7OqHoayxA7mgWmYHoL0ozfpczg8dSoOWMI6GSpKMVh8A1oclmCWyG0eALhg6lnu0DC/Z4fO8ZjpY7bJa8LKjqHm1GSe0kWActFre2FvhGl7Haorz/jcR8oCE2BYkncXAIbaXou9ZElEl4oGugdB04t89/1O/w1cDnyilFU='
USER_ID = 'U45b21315beeb2c8623284fa65db57818'

# 調用 SERP API，搜索指定位置
url = f'https://serpapi.com/search.json?engine={ENGINE}&q={LOCATION}&api_key={API_KEY}'
response = requests.get(url)
data = json.loads(response.text)

# 提取搜索結果中的地圖鏈接和位置信息
map_url = data['maps_result']['link']
address = data['knowledge_graph']['address']

# 將搜索結果格式化為 Line 的 Flex Message
flex_message = {
  "type": "bubble",
  "direction": "ltr",
  "hero": {
    "type": "image",
    "url": map_url,
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "md",
    "contents": [
      {
        "type": "text",
        "text": address,
        "wrap": True,
        "weight": "bold",
        "size": "xl"
      }
    ]
  }
}
message = FlexSendMessage(alt_text="Map location", contents=flex_message)

# 使用 Line SDK 將消息發送給用戶
line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
line_bot_api.push_message(USER_ID, messages=message)
