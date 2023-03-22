using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.CustomDataAttributes.InjectionAttributes;
using Newtonsoft.Json;

namespace Services
{
    [ScopedAttribute]
    public class RoomsService
    {
        private string BASE_URL = "https://localhost:3001";

        public async Task<string> GetRoomsAsync()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(BASE_URL + "/rooms");

                if(!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var data = await response.Content.ReadAsStringAsync();

                return JsonConvert.SerializeObject(data);
            }
        }
    }
}
