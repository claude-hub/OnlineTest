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

        public object GetArticleList(int currentPage, int pageSize = 10)
        {
            return _communicateService.GetArticleList(currentPage, pageSize);
        }
        public object GetArticleList(string query, bool isPublish, int currentPage, int pageSize = 15)
        {
            return _communicateService.GetArticleList(query, isPublish, currentPage, pageSize);
        }

        public object GetArticleListByUser(int uId, int currentPage, int pageSize = 10)
        {
            return _communicateService.GetArticleListByUser(uId, currentPage, pageSize);
        }

        public object GetCommentByArtId(int artId)
        {
            return _communicateService.GetCommentByArtId(artId);
        }

        public bool PublishArticle(int artId)
        {
            return _communicateService.PublishArticle(artId);
        }

        public bool UnPublishArticle(int artId)
        {
            return _communicateService.UnPublishArticle(artId);
        }

        public object DeleteArticle(int artId)
        {
            return _communicateService.DeleteArticle(artId);
        }

        public bool AddComment(int uId, int artId, string content, int parentId = 0)
        {
            return _communicateService.AddComment(uId, artId, content, parentId);
        }

        public bool AddArticlePraiseNum(int artId)
        {
            return _communicateService.AddPraiseNum(artId);
        }

        public bool AddArticleTrampleNum(int artId)
        {
            return _communicateService.AddTrampleNum(artId);
        }

        public bool AddCommentPraiseNum(int comId)
        {
            return _communicateService.AddCommentPraiseNum(comId);
        }

        public bool AddCommentTrampleNum(int comId)
        {
            return _communicateService.AddCommentTrampleNum(comId);
        }

        
    }
}
