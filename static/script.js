'use strict';

const cssans = () => {
  $('.cssans').each((i, elm) => {
    CSSans(elm, elm.innerText);
  });
};
cssans();

const Logo = Joi.object().keys({
  title: Joi.string().required(),
  url: Joi.string().uri()
});

$('#add').click(() => {
  const logo = {
    title: $('#logoTitle').val(),
    url: $('#logoURL').val()
  };

  const result = Joi.validate(logo, Logo);

  if (result.error) {
    $.toast("Please enter the logo Title and URL.");
    $('#logoTitle').addClass('animated shake');
    $('#logoURL').addClass('animated shake');
    setTimeout(() => {
      $('#logoTitle').removeClass('animated shake');
      $('#logoURL').removeClass('animated shake');
    }, 1000);
    return;
  }

  $('#list').append(`<li class="animated bounce"><h4 class="cssans">${logo.title}</h4><img src="${logo.url}" class="vw-100 radius-10"></li>`);
  cssans();
});

$('#preview').click(() => {
  const result = Joi.validate($('#logoURL').val(), Joi.string().uri());
  if (result.error) {
    $.toast('Please enter the logo URL.');
    $('#logoURL').addClass('animated shake');
    setTimeout(() => {
      $('#logoURL').removeClass('animated shake');
    }, 1000);
    return;
  }
  $('#previewer').attr('src', $('#logoURL').val());
});