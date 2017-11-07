import $ from 'jquery';

$(document).ready(() => {
  // $('#collection').popover({
  //   content: '集合名以字母、下划线或斜杠开头, 且只能包含字母, 下划线, 数字, 小数点或斜杠',
  //   placement: 'left',
  // });

  const $deleteButton = $('.deleteButton');

  // $deleteButton.tooltip({
  //   title: '警告! 你确定要删除集合吗? 所有文档将被删除',
  // });

  $deleteButton.on('click', function onDeleteClick(event) {
    // $deleteButton.tooltip('hide');

    event.preventDefault();

    const target = $(this);
    const parentForm = $('#' + target.attr('childof'));

    $('#confirmation-input').attr('shouldbe', target.attr('collection-name'));
    $('#modal-collection-name').text(target.attr('collection-name'));
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
});
