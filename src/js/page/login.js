/* jshint esversion: 6 */
/*!
 * Login 登陆模块  v0.0.1
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 * Date: 2019-04-4
 */

import debug from '../components/debug/debug'; // 控制台调试
import alertinfo from '../components/debug/alertinfo';
export default class Login {
  constructor(setNavActive) {
    // 设置导航第几个选中
    setNavActive(3);
    // 控制台输出信息 方便调试页面是否加载
    debug('Login controller is load');
  }

  index() {
    this.doLogin();
  }

  doLogin() {
    $('body').off('click', '.login-form button').on('click', '.login-form button', function () {
      let username = $('#username').val();
      let password = $('#password').val();
      if (!username) {
        alertinfo('请输入用户名!');
        return false;
      }
      if (!password) {
        alertinfo('请输入密码!');
        return false;
      }
      let data = {
        username: username,
        password: password
      };
      pajax.post(window.promiseHost + '/login', data)
        .then(res => res.auto()).then(body => {
          if (body.code == 200) {
            cookie.set('token', body.data.token, {
              expires: 1
            });
            cookie.set('UID', body.data.id, {
              expires: 1
            });
            cookie.set('USER_NAME', body.data.username, {
              expires: 1
            });
            $.pjax({
              url: "/workspace.html",
              container: "main",
              fragment: "main",
              timeout: 8000,
              scrollTo: false
            });
          } else {
            alertinfo('登陆失败请重试!');
            return false;
          }
        });
    });
  }
}
