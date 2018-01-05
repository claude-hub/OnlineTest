using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineTest_Application.Communicate
{
    public interface ICommunicateAppService
    {
        /// <summary>
        /// 创建文章
        /// </summary>
        /// <param name="uId">用户ID</param>
        /// <param name="title">文章名</param>
        /// <param name="content">文章内容</param>
        /// <param name="label">文章标签</param>
        /// isPublish: 发布：true
        /// <returns></returns>
        bool CreateArticle(int uId, string title, string content, string label);
        object GetArticleById(int artId);
        object GetArticleList(int currentPage, int pageSize = 10);
        object GetArticleList(string query, bool isPublish, int currentPage, int pageSize = 15);
        object GetArticleListByUser(int uId, int currentPage, int pageSize = 10);
        object GetCommentByArtId(int artId);
        bool PublishArticle(int artId);
        bool UnPublishArticle(int artId);
        object DeleteArticle(int artId);
        bool AddComment(int uId, int artId, string content, int parentId = 0);
        bool AddArticlePraiseNum(int artId);
        bool AddArticleTrampleNum(int artId);
        bool AddCommentPraiseNum(int comId);
        bool AddCommentTrampleNum(int comId);

    }
}
