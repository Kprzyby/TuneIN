using Data.Repositories;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.DTOs.Library;
using Data.DTOs.Response;
using Data.CustomDataAttributes.InjectionAttributes;
using Data.DTOs.Tracks;

namespace Services
{
    [ScopedAttribute]
    public class ApiCallsService : BaseService
    {
        #region Properties

        private const string APIKEY = "dde99a48aa1f6cbe1ec0d1122e3292cc";//TO HIDE

        #endregion Properties
        #region Constructors

        public ApiCallsService() { }

        #endregion Constructors
        #region Methods

        public async Task<ServiceResponseDTO> GetTrackInfoAsync(string artist, string trackName)
        {
            try
            {
                var httpClient = new HttpClient();

                var requestUri = $"http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key={APIKEY}&artist={artist}&track={trackName}&format=json";

                var responseBody = await httpClient.GetAsync(requestUri);

                var responseContent = await responseBody.Content.ReadAsStringAsync();

                var trackInfo = JsonConvert.DeserializeObject<Root>(responseContent);

                RetrieveTrackInfoDTO response = new RetrieveTrackInfoDTO()
                {
                    TrackName = trackInfo.track.name,
                    Band = trackInfo.track.artist.name,
                    Genre = trackInfo.track.toptags.tag[0].name,
                    LinkToCover = trackInfo.track.album.image[3].Text,
                };

                return CreateSuccessResponse(200, "Track information retrieved successfully", response);
            }
            catch (Exception ex)
            {
                return CreateFailureResponse(500, "Error while retrieving the trackInfo");
            }
        }

        public async Task<string> GetSearchListAsync(string trackName)
        {
            try
            {
                var httpClient = new HttpClient();

                var url = "http://ws.audioscrobbler.com/2.0/?method=track.search" +
                "&api_key=" + APIKEY + "&track=" + trackName + "&limit=10" +
                "&format=json";

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
            catch (Exception ex)
            {
                return null;
            }

        }

        #endregion Methods
    }
}
