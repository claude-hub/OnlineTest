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
                IsDelete = false,
            };
            _onlineTestContext.Article.Add(article);
            _onlineTestContext.SaveChanges();
            return true;
        }

        public object GetArticleById(int artId)
        {
            var art = (from a in _onlineTestContext.Article
                       where a.Id == artId && !a.IsDelete
                       select new
                       {
                           id = a.Id,
                           title = a.Title,
                           author = a.User.NikeName,
                           label = a.Label,
                           createTime = a.CreateTime,
                           content = a.Content,
                           praiseNum = a.PraiseNum,
                           trampleNum = a.TrampleNum,
                           commentNum = a.CommentNum,                          
                       }).ToList();
            return art;
        }

        public object GetArticleList(int currentPage,int pageSize = 10)
        {
            var artList = (from art in _onlineTestContext.Article
                           where art.IsPublish
                           orderby art.Id descending                           
                           select new
                           {
                               id = art.Id,
                               title = art.Title,
                               author = art.User.NikeName,
                               label = art.Label,
                               createTime = art.CreateTime,
                               praiseNum = art.PraiseNum,
                               trampleNum = art.TrampleNum,
                               commentNum = art.CommentNum,
                           }).ToList();
            var result = new
            {
                count = artList.Count(),
                arts = artList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }
        public object GetArticleList(string query, bool isPublish, int currentPage, int pageSize = 15)
        {
            query = string.IsNullOrEmpty(query) ? "" : query;
            var artList = (from art in _onlineTestContext.Article
                           where art.IsPublish.Equals(isPublish) && !art.IsDelete && (art.Title.Contains(query) || art.User.NikeName.Contains(query))
                           orderby art.Id descending
                           select new
                           {
                               id = art.Id,
                               title = art.Title,
                               author = art.User.NikeName,
                               label = art.Label,
                               createTime = art.CreateTime,
                               content = art.Content,
                               isPublish = art.IsPublish ? "已发布" : "未发布"
                           }).ToList();
            var result = new
            {
                count = artList.Count(),
                arts = artList.Skip((currentPage - 1) * pageSize).Take(pageSize)
            };
            return result;
        }

        public object GetArticleListByUser(int uId, int currentPage, int pageSize = 10)
        {
            var artList = (from art in _onlineTestContext.Article
                           where art.UserId == uId && !art.IsDelete
                           orderby art.Id descending
                           select new
                           {
                               id = art.Id,
                               title = art.Title,
                               author = art.User.NikeName,
                               label = art.Label,
                               createTime = art.CreateTime,
                               isPublish = art.IsPublish ? "已发布" : "未发布"
                           }).Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
            return artList;
        }

        public object GetCommentByArtId(int artId)
        {
            //找到该文章所有的评论
            List<Comments> allComList = (from com in _onlineTestContext.Comment
                           where com.ArticleId == artId
                           select new Comments
                           {
                               Id = com.Id,
                               ArticleId = com.ArticleId,
                               ParentId = com.ParentId,
                               UserName = com.Owner.NikeName,
                               CreateTime = com.CreateTime,
                               PraiseNum = com.PraiseNum,
                               TrampleNum = com.TrampleNum,
                               Content = com.Content,
                           }).ToList();
            List<Comments> result = GetParentComment(allComList);
            return result;
        }

        public List<Comments> GetParentComment(List<Comments> allComList)
        {
            var pComments = allComList.Where(c => c.ParentId == 0).ToList();
            foreach(var item in pComments)
            {
                item.Children = GetChildrenComment(item.Id, allComList);
            }
            return pComments;
        }

        public List<Comments> GetChildrenComment(int parentId, List<Comments> allComList)
        {
            List<Comments> cComments = allComList.Where(c => c.ParentId == parentId).ToList();
            foreach (var item in cComments)
            {
                item.Children = GetChildrenComment(item.Id, allComList);
            }
            return cComments;
        }

        public bool PublishArticle(int artId)
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

        public object DeleteArticle(int artId)
        {
            Article art = _onlineTestContext.Article.SingleOrDefault(a => a.Id == artId);
            var result = new object();
            if (art.IsPublish)
            {
                result = new
                {
                    isSuccess = false,
                    message = "请撤销文章后删除！"
                };
            }
            else
            {
                art.IsDelete = !art.IsDelete;
                _onlineTestContext.SaveChanges();
                result = new
                {
                    isSuccess = true,
                    message = "删除成功！"
                };
            }
            return result;
        }

        public bool AddComment(int uId, int artId, string content, int parentId = 0)
        {
            Comment com = new Comment()
            {
                OwnerId = uId,
                ArticleId = artId,
                ParentId = parentId,
                Content = content,
                CreateTime = DateTime.Now,
                PraiseNum = DefaultNum,
                TrampleNum = DefaultNum,
            };
            _onlineTestContext.Comment.Add(com);
            _onlineTestContext.SaveChanges();
            AddCommentNum(artId);
            return true;
        }

        public bool AddPraiseNum(int artId)
        {
            Article art = _onlineTestContext.Article.SingleOrDefault(a => a.Id == artId);
            art.PraiseNum++;
            _onlineTestContext.SaveChanges();
            return true;
        }

        public bool AddTrampleNum(int artId)
        {
            Article art = _onlineTestContext.Article.SingleOrDefault(a => a.Id == artId);
            art.TrampleNum++;
            _onlineTestContext.SaveChanges();
            return true;
        }

        public void AddCommentNum(int artId)
        {
            Article art = _onlineTestContext.Article.SingleOrDefault(a => a.Id == artId);
            art.CommentNum++;
            _onlineTestContext.SaveChanges();
        }

        public bool AddCommentPraiseNum(int comId)
        {
            Comment com = _onlineTestContext.Comment.SingleOrDefault(a => a.Id == comId);
            com.PraiseNum++;
            _onlineTestContext.SaveChanges();
            return true;
        }
        public bool AddCommentTrampleNum(int comId)
        {
            Comment com = _onlineTestContext.Comment.SingleOrDefault(a => a.Id == comId);
            com.TrampleNum++;
            _onlineTestContext.SaveChanges();
            return true;
        }
    }
}
