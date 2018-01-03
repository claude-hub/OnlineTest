using OnlineTest_Entity.Models;
using System;
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
    }
}
