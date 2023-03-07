using Data.CustomDataAttributes.InjectionAttributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Services
{
    [ScopedAttribute]
    public class LibraryService
    {
        private const string APIKEY = "dde99a48aa1f6cbe1ec0d1122e3292cc";//TO HIDE

        public async Task<JObject> GetTrackInfoAsync(string artist, string track)
        {

            var httpClient = new HttpClient();
            var requestUri = $"http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key={APIKEY}&artist={artist}&track={track}&format=json";
            var response = await httpClient.GetAsync(requestUri);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            return JObject.Parse(responseContent);
        }
        /*
        public async Task<JObject> GetSearchListAsync(string track)
        {

            var httpClient = new HttpClient();
            var requestUri = $"http://ws.audioscrobbler.com/2.0/?method=track.search&track={track}&api_key={APIKEY}&format=json";
            var response = await httpClient.GetAsync(requestUri);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            return JObject.Parse(responseContent);
        }
        */
        public async Task<string> GetSearchListAsync(string trackName)
        {
            var url = "http://ws.audioscrobbler.com/2.0/?method=track.search" +
                "&api_key=" + APIKEY + "&track=" + trackName + "&limit=10" +
                "&format=json";

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync(url);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                JArray trackArray = JObject.Parse(jsonResponse)["results"]["trackmatches"]["track"].ToObject<JArray>();

                List<JObject> trackList = new List<JObject>();
                foreach (var trackObject in trackArray)
                {
                    trackList.Add(new JObject(
                        new JProperty("name", trackObject["name"]),
                        new JProperty("artist", trackObject["artist"]),
                        new JProperty("url", trackObject["url"])
                    ));
                }

                return JsonConvert.SerializeObject(trackList);
            }
        }

    }
}
