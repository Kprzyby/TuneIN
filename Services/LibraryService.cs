using Data.CustomDataAttributes.InjectionAttributes;
using Newtonsoft.Json.Linq;

namespace Services
{
    [ScopedAttribute]
    public class LibraryService
    {
        private const string APIKEY = "";//TO HIDE

        public async Task<JObject> GetTrackInfoAsync(string artist, string track)
        {

            var httpClient = new HttpClient();
            var requestUri = $"http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key={APIKEY}&artist={artist}&track={track}&format=json";
            var response = await httpClient.GetAsync(requestUri);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            return JObject.Parse(responseContent);
        }

        public async Task<JObject> GetSearchList(string track)
        {

            var httpClient = new HttpClient();
            var requestUri = $"http://ws.audioscrobbler.com/2.0/?method=track.search&track={track}&api_key={APIKEY}&format=json";
            var response = await httpClient.GetAsync(requestUri);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            return JObject.Parse(responseContent);
        }

    }
}
