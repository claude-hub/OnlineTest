
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using OnlineTest_Entity.Models;
using System.Net.Mail;
using System;
using System.Collections.Generic;

namespace OnlineTest_Core.Users
{
    public class UserService
    {
        private readonly OnlineTestContext _onlineTestContext = new OnlineTestContext();
        private readonly string CommonUser = "Common";
        private readonly string AdminUser = "Admin";
        public string Md5Encrypt(string password)
        {
            MD5 md5 = MD5.Create();
            byte[] buffer = Encoding.Default.GetBytes(password);  //将string类型的password转换成byte类型
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < buffer.Length; i++)
            {
                sb.Append(buffer[i].ToString("x2")); //将十进制转换为十六进制，2表示加0如：x-> 0xA x2->0x0A
            }
            return sb.ToString();
        }
        /// <summary>
        /// 发送邮件
        /// </summary>
        public bool SendEMail(string mailAddress, string validataCode)
        {
            //string validataCode = System.Guid.NewGuid().ToString();
            try
            {
                MailMessage eMail = new MailMessage();
                eMail.To.Add(mailAddress);
                eMail.From = new MailAddress("13628471426@163.com", "小米", System.Text.Encoding.UTF8);
                eMail.Subject = "注册邮件";
                eMail.SubjectEncoding = System.Text.Encoding.UTF8;
                eMail.Body = "点击下面链接激活账号，48小时生效!</br><a href='http://192.168.199.233:52675/api/User/CheckRegister?account=" + mailAddress + "&validataCode=" + validataCode + "'>点击这里</a></br>";
                eMail.BodyEncoding = System.Text.Encoding.UTF8;
                eMail.IsBodyHtml = true;
                eMail.Priority = MailPriority.High;
                SmtpClient client = new SmtpClient();
                client.UseDefaultCredentials = true;
                client.Credentials = new System.Net.NetworkCredential("13628471426@163.com", "jxzxc1230");
                client.Host = "smtp.163.com";
                client.Port = 25;
                client.EnableSsl = true;
                client.Send(eMail);
                return true;
            }
            catch
            {
                return false;
            }
        }
        
        public User Login(string account, string password)
        {
            User user = _onlineTestContext.User.SingleOrDefault(u => u.Account.Equals(account) && u.Password.Equals(password));
            return user ?? null;
        }
        public User AdminLogin(string account,string password)
        {
            User user = _onlineTestContext.User.SingleOrDefault(u => u.Account.Equals(account) && u.Password.Equals(password) && u.Status.Equals(AdminUser));
            return user ?? null;
        }
        //创建一个用户
        public bool CreateUser(string account, string password, string nikeName,string status)
        {
            var isUser = _onlineTestContext.User.Where(u => u.Account.Equals(account)).ToList();
            string validataCode = System.Guid.NewGuid().ToString();
            if (isUser.Count != 0)
                return false;
            else
            {
                User user = new User()
                {
                    Account = account,
                    Password = password,
                    NikeName = nikeName,
                    Status = status,
                    CreateTime = DateTime.Now,
                    VerificationCode = validataCode,
                    IsVerification = -1
                };
                _onlineTestContext.User.Add(user);
                _onlineTestContext.SaveChanges();
                return SendEMail(account, validataCode);
            }
        }
        //更改用户密码
        public bool ModifyPassword(int userId, string nPassword)
        {
            User user = _onlineTestContext.User.SingleOrDefault(u => u.UserId == userId);
            user.Password = nPassword;
            _onlineTestContext.SaveChanges();
            return true;
        }

        public bool ModifyNikeName(int uId, string nikeName)
        {
            User user = _onlineTestContext.User.SingleOrDefault(u => u.UserId == uId);
            user.NikeName = nikeName;
            _onlineTestContext.SaveChanges();
            return true;
        }
        //验证邮箱
        public bool CheckRegister(string account, string validataCode)
        {
            User user = _onlineTestContext.User.SingleOrDefault(u => u.Account.Equals(account) && u.VerificationCode.Equals(validataCode));
            if (user != null)
            {
                user.IsVerification = 1;
                _onlineTestContext.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public object GetUserListByStatus(string status, int currentPage, int pageSize = 15)
        {
            List<User> userList = _onlineTestContext.User.Where(u => u.Status.Equals(status)).OrderBy(u => u.UserId).ToList();
            var result = new
            {
                count = userList.Count(),
                user = ChangeUserType(userList.Skip((currentPage - 1) * pageSize).Take(pageSize))
            };
            return result;
        }

        public object SearchUser(string query, int currentPage, int pageSize = 15)
        {
            List<User> userList = _onlineTestContext.User.Where(u => u.NikeName.Contains(query) || u.Account.Contains(query)).OrderBy(u => u.UserId).ToList();
            var result = new
            {
                count = userList.Count(),
                user = ChangeUserType(userList.Skip((currentPage - 1) * pageSize).Take(pageSize))
            };
            return result;
        }

        //转换数据结构
        public object ChangeUserType(IEnumerable<User> userList)
        {
            var uList = new List<object>();
            foreach (var item in userList)
            {
                var user = new
                {
                    id = item.UserId,
                    account = item.Account,
                    name = item.NikeName,
                    password = item.Password,
                    createTime = item.CreateTime,
                };
                uList.Add(user);
            }
            //var result = new
            //{
            //    count = userList.Count(),
            //    user = uList
            //};
            return uList;
        }
    }
}
