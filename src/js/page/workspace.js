/* jshint esversion: 6 */
/*!
 * workspace 工作台模块  v0.0.1
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 * Date: 2019-04-4
 */

import debug from '../components/debug/debug'; // 控制台调试
import Common from '../components/common/common';
import stepBar from '../components/stepBar/stepBar';
import '../components/iziModal/iziModal';
export default class Workspace {
  constructor(setNavActive) {
    // 检查是否登陆
    let common = new Common();
    common.islogin();
    // 设置导航第几个选中
    setNavActive(3);
    // 控制台输出信息 方便调试页面是否加载
    debug('workspace controller is load');
    $('body').off("input propertychange", '#project_name').on("input propertychange", '#project_name', function () {
      let e = $(this).val();
      $('#project_path').val('/www/' + pinyin.getFullChars(e))
    })
  }

  index() {
    this.addItemMaskShow();
  }

  addItemMaskShow() {
    $("#iziModal").iziModal({
      overlayClose: false,
      width: 600,
      autoOpen: false,
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      onOpened: function () {
        console.log('onOpened');
      },
      onClosed: function () {
        console.log('onClosed');
      }
    });
    $(document).on('click', '#showAddMask', function (event) {
      event.preventDefault();

      // let html = $('#modal-default').html();
      // $('#modal-default').remove();
      // $('<div id="modal-default" class="iziModal" >' + html + '</div>').appendTo("body");
      $('#iziModal').iziModal('open');
    });

    $("#iziModal").on('click', '.submit', function (event) {
      event.preventDefault();

      var fx = "wobble", //wobble shake
        $modal = $(this).closest('.iziModal');

      if (!$modal.hasClass(fx)) {
        $modal.addClass(fx);
        setTimeout(function () {
          $modal.removeClass(fx);
        }, 1500);
      }
    });

  }

  step() {
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
