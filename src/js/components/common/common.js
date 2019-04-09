/* jshint esversion: 6 */
/*!
 * Index 首页模块  v0.0.1
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 * Date: 2019-04-4
 */

import debug from '../debug/debug'; // 控制台调试
export default class common {
  constructor() {

  }

  index() {

  }

  islogin() {
    if (!cookie.get('token') || !cookie.get('UID')) {
      let url = 'login.html';
      $.pjax({
        url,
        container: "main",
        fragment: "main",
        timeout: 8000,
        scrollTo: false
      });
      return false;
    }
    pajax.post(window.promiseHost + '/islogin', {
      id: cookie.get('UID'),
      pathname: window.location.pathname
    }, {
      "headers": {
        'Authentication': cookie.get('token')
      }
    }).then(res => res.auto()).then(body => {
      if(body.code == 200){
        if(window.location.pathname != body.data.path){
          $.pjax({
            url: body.data.path,
            container: "main",
            fragment: "main",
            timeout: 8000,
            scrollTo: false
          });
          return false;
        }
      }else{
        let url = 'login.html';
        $.pjax({
          url,
          container: "main",
          fragment: "main",
          timeout: 8000,
          scrollTo: false
        });
        return false;
      }
    });
    // pajax.get(window.promiseHost + '/islogin')
    //   .then(res => res.auto()).then(body => {
    //     if(body.code == 200){
    //       debug(body.msg);
    //     }else{
    //       let url = 'login.html';
    //       $.pjax({
    //         url,
    //         container: "main",
    //         fragment: "main",
    //         timeout: 8000,
    //         scrollTo: false
    //       });
    //     }
    //   });

  }

}
