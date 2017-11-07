import $ from 'jquery';

$(document).ready(() => {
  // $('#database').popover({
  //   content: '名字不为空, 小于64个字符, 不包含 /. "$*<>:|?',
  // });

  const $deleteButton = $('.deleteButton');

  // $deleteButton.tooltip({
  //   title: '警告! 你确定要删除数据库吗? 所有集合将被删除',
  // });

  $deleteButton.on('click', function onDeleteClick(event) {

    // $deleteButton.tooltip('hide');

    event.preventDefault();

    const $target = $(this);
    const parentForm = $('#' + $target.attr('childof'));

    const dbName = $target.attr('database-name');

    $('#confirmation-input').attr('shouldbe', dbName);
    $('#modal-database-name').text(dbName);
    $('#confirm-deletion').modal({ backdrop: 'static', keyboard: false })
      .one('shown.bs.modal', () => {
        $('#confirmation-input').focus();
      })
      .one('click', '#delete', () => {
        const input = $('#confirmation-input');
        if (input.val().toLowerCase() === input.attr('shouldbe').toLowerCase()) {
          parentForm.trigger('submit');
        }
      });
  });

  $('#left-menu .info').css('background-color', '#ecf6fd')

});
