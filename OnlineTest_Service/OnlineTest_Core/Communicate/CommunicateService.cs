using OnlineTest_Entity.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Core.Communicate
{
    public class CommunicateService
    {
        private readonly OnlineTestContext _onlineTestContext = new OnlineTestContext();
        private readonly int DefaultNum = 0;  //默认数量
        public bool CreateArticle(int uId, string title, string content, string label)
        {
            Article article = new Article()
            {
                UserId = uId,
                Title = title,
                Content = content,
                CreateTime = DateTime.Now,
                Label = label,
                PraiseNum = DefaultNum,  //赞
                TrampleNum = DefaultNum,//踩
                CommentNum = DefaultNum,
                IsPublish = false,
            };
            _onlineTestContext.Article.Add(article);
            _onlineTestContext.SaveChanges();
            return true;
        }

        public object GetArticleById(int artId)
        {
            var art = (from a in _onlineTestContext.Article
                       where a.Id == artId
                       select new
                       {
                           id = a.Id,
                           title = a.Title,
                           author = a.User.NikeName,
                           label = a.Label,
                           createTime = a.CreateTime,
                           content = a.Content,
                       }).ToList();
            return art;
        }

        public object GetArticleList(string query, bool isPublish, int currentPage, int pageSize = 15)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var artList = (from art in _onlineTestContext.Article
                           where art.IsPublish.Equals(isPublish) && (art.Title.Contains(query) || art.User.NikeName.Contains(query))
                           select new
                           {
                               id = art.Id,
                               title = art.Title,
                               author = art.User.NikeName,
                               label = art.Label,
                               createTime = art.CreateTime,
                               content = art.Content,
                               isPublish = art.IsPublish ? "已发布" : "未发布"
                           }).OrderBy(a =>a.id).ToList();
            var result = new
            {
                count = artList.Count(),
                arts = artList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public bool  PublishArticle(int artId)
        {
            Article art = _onlineTestContext.Article.SingleOrDefault(a => a.Id == artId && !a.IsPublish);
            try
            {
                art.IsPublish = !art.IsPublish;
                _onlineTestContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }            
        }

        public bool UnPublishArticle(int artId)
        {
            Article art = _onlineTestContext.Article.SingleOrDefault(a => a.Id == artId && a.IsPublish);
            try
            {
                art.IsPublish = !art.IsPublish;
                _onlineTestContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
