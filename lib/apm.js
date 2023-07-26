let search = async (query) => {
    let data = await fetch("https://api.apmmusic.com/search/tracks", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Chromium\";v=\"117\", \"Not;A=Brand\";v=\"8\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-csrf-token": "BASNjbQeR0ibnmamJ1UE1xF3iL2UNRI6Za-5FYBeQyA",
          "x-sundrop-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidHlwZSI6ImNvbXBvc2l0ZSIsImZpZWxkIjoidXNlcmluZm8iLCJ2YWx1ZSI6W3sidHlwZSI6InRleHQiLCJ2YWx1ZSI6IjAiLCJmaWVsZCI6InVzZXJpZCIsIm9wZXJhdGlvbiI6ImluY2x1ZGUifV0sIm9wZXJhdGlvbiI6ImluY2x1ZGUifSx7InR5cGUiOiJ0YWciLCJ2YWx1ZSI6IlVTIiwiZmllbGQiOlsicmVzdHJpY3RlZF90byJdLCJvcGVyYXRpb24iOiJtdXN0In1d.N4wYVgW8VnoKSZApYYjGqS2T3Tud_f4oHDCcKrBqPqg",
        },
        "body": JSON.stringify({ "limit": 25, "offset": 0, "sort": "relevancy_base", "terms": [{ "type": "text", "field": ["tags", "track_title", "track_description", "album_title", "album_description", "sound_alikes", "lyrics", "library", "composer"], "value": query, "operation": "must" }] }),
        "method": "POST"
      });
      let json = await data.json();
      return json
}
module.exports = {
    serach: search
}