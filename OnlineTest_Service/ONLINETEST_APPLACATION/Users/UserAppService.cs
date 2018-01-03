
using ONLINETEST_CORE.Users;
using ONLINETEST_ENTITY.Models;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace ONLINETEST_APPLICATION.Users
{
    public class UserAppService : IUserAppService
    {
        private readonly UserService _userService = new UserService();
        private OnlineTestContext _onlineTestContext = new OnlineTestContext();

        public bool CheckRegister(string account, string validataCode)
        {
            return _userService.CheckRegister(account, validataCode);
        }

        public bool CreateUser(string account, string password, string nikename, string status = "Common")
        {
            return _userService.CreateUser(account, password, nikename,status);
        }

        public User Login(string account, string password)
        {
            return _userService.Login(account, password);
        }
        public User AdminLogin(string account,string password)
        {
            return _userService.AdminLogin(account, password);
        }
        public string Md5Encrypt(string password)
        {
            return _userService.Md5Encrypt(password);
        }

        public bool ModifyPassword(int userId, string nPassword)
        {
            return _userService.ModifyPassword(userId, nPassword);
        }

        public User GetUserById(int id)
        {
            User user = _onlineTestContext.User.Find(id);
            return user ?? null;
        }

        public object GetUserListByStatus(string status, int currentPage, int pageSize = 15)
        {
            return _userService.GetUserListByStatus(status, currentPage, pageSize);
        }

        public object SearchUser(string query, int currentPage, int pageSize = 15)
        {
            return _userService.SearchUser(query, currentPage, pageSize);
        }

    }
}
