/* jshint esversion: 6 */
/*!
 * workspace 工作台模块  v0.0.1
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 * Date: 2019-04-4
 */

import debug from '../components/debug/debug';// 控制台调试
import Common from '../components/common/common';
import stepBar from '../components/stepBar/stepBar';
export default class Workspace {
  constructor(setNavActive) {
    // 检查是否登陆
    let common = new Common();
    common.islogin();
    // 设置导航第几个选中
    setNavActive(3);
    // 控制台输出信息 方便调试页面是否加载
    debug('workspace controller is load');
  }

  index() {

  }

  step(){
    var step = $("#myStep").step();
    $("#preBtn").click(function (event) {
      var yes = step.preStep();
    });
    $("#nextBtn").click(function (event) {
      var yes = step.nextStep();
    });
    $("#goBtn").click(function (event) {
      var yes = step.goStep(3);
    });
  }


}
