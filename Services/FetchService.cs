using Data.CustomDataAttributes.InjectionAttributes;
using HtmlAgilityPack;
using OpenQA.Selenium.Chrome;

namespace Services
{
    [ScopedAttribute]
    public class FetchService
    {
        public async Task<string> GetURL(string userInput)
        {
            var html = await GetHtmlAsync(userInput);
            var data = ParseHtmlUsingHtmlAgilityPack(html);
            string link = GetLink(data);
            return link;
        }

        private async Task<string> GetHtmlAsync(string userInput)
        {
            var options = new ChromeOptions
            {
                //BinaryLocation = @"C:\Program Files\Google\Chrome\Application\chrome.exe"
            };

            options.AddArguments("headless");

            var chrome = new ChromeDriver(options);
            string url = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + userInput;
            //chrome.Navigate().GoToUrl(url);
            await Task.Run(() => chrome.Navigate().GoToUrl(url));
            return chrome.PageSource;
        }

        private List<string> ParseHtmlUsingHtmlAgilityPack(string html)
        {
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            var repositories =
             htmlDoc
                 .DocumentNode
                 .SelectNodes("//div[@class='lIKMM g7KZB']/header/span/span");

            var hrefs = repositories.Descendants("a")
                       .Select(node => node.GetAttributeValue("href", ""))
                       .ToList();

            return hrefs;
        }

        private string GetLink(List<string> links)
        {
            string linkToChords = null;
            foreach (var link in links)
            {
                if (link.Contains("chords"))
                {
                    linkToChords = link;
                    break;
                }
            }
            return linkToChords;
        }
    }
}