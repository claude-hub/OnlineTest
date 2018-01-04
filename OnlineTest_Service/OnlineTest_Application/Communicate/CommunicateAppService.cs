using OnlineTest_Core.Communicate;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Application.Communicate
{
    public class CommunicateAppService : ICommunicateAppService
    {
        private readonly CommunicateService _communicateService = new CommunicateService();
        public bool CreateArticle(int uId, string title, string content, string label)
        {
            return _communicateService.CreateArticle(uId, title, content, label);
        }

        public object GetArticleById(int artId)
        {
            return _communicateService.GetArticleById(artId);
        }

        public object GetArticleList(string query, bool isPublish, int currentPage, int pageSize = 15)
        {
            return _communicateService.GetArticleList(query, isPublish, currentPage, pageSize);
        }

        public bool PublishArticle(int artId)
        {
            return _communicateService.PublishArticle(artId);
        }

        public bool UnPublishArticle(int artId)
        {
            return _communicateService.UnPublishArticle(artId);
        }
    }
}
