using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.CustomDataAttributes.InjectionAttributes;
using System.Net.Http;
using HtmlAgilityPack;

namespace Services
{
    [ScopedAttribute]
    public class FetchService
    {

        /*
        public async Task<string> GetURl(string userInput)
        {
            
            WebClient client = new WebClient();
            string url = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + userInput;
            string websiteHTML = await client.DownloadStringTaskAsync(url);
            string pattern = @"[a - zA - Z] +://tabs\.([A-Za-z0-9]+(-[A-Za-z0-9]+)+)\.[a-zA-Z]+/tab/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)/[a-zA-Z]+-chords-[A-Za-z0-9]+";
            foreach(char s in websiteHTML)
            {

            }
            
        }
        */
        public async Task GetURL(string userInput)
        {
            var html = await GetHtml(userInput);
            var data = ParseHtmlUsingHtmlAgilityPack(html);
        }


        private async Task<string> GetHtml(string userInput)
        {
            var client = new HttpClient();
            string finalString = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + userInput;
            return await client.GetStringAsync(finalString);
        }
        private Task<string> ParseHtmlUsingHtmlAgilityPack(string html)
        {
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            var repositories =
                htmlDoc
                    .DocumentNode
                    .SelectNodes("//div[@class='LQUZJ']/div[@class='lIKMM g7KZB']/header/span/span");

            List<(string RepositoryName, string Description)> data = new();

            foreach (var repo in repositories)
            {
                var name = repo.SelectSingleNode("div/div/span/a").InnerText;
                var description = repo.SelectSingleNode("p").InnerText;
                data.Add((name, description));
            }

            return data;
        }

    }
}
