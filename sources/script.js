var user_name = prompt("Please enter your name");

var socket = io();

socket.emit('user_login', user_name || "No name");

socket.on('receive_message', (text) => {
    showMessage(text,'left');
});

function showMessage(text, message_side) {
    if (text.trim() === '') {
        return;
    }
    $('.message_input').val('');
    var messages_box = $('.messages');
    var message = $($('.message_template').clone().html());
    message.addClass(message_side).find('.text').html(text);
    messages_box.append(message);
    setTimeout(() => message.addClass('appeared'), 0);
    messages_box.animate({ scrollTop: messages_box.prop('scrollHeight') }, 300);
};

$('.send_message').click((e) => {
    var s = $('.message_input').val();
    if(s.length < 1) return;
    if(s == 'clear') {
        $('.messages').html('');
        showMessage('Đã xoá!','left');
    } else {
        socket.emit('send_message',s)
        //showMessage(s,'right');
    }
});

$('.message_input').keyup((e) => {
    if (e.which === 13) {
        var s = $('.message_input').val();
        if(s.length < 1) return;
        if(s == 'clear') {
            $('.messages').html('');
            showMessage('Đã xoá!','left');
        } else {
            socket.emit('send_message',s)
            //showMessage(s,'right');
        }
    }
});
