function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

var user_id;

var check = getCookie('drf_token');

axios({
    method: 'get',
    url: '/accounts/token/',
    headers: {
        Authorization: decodeURIComponent(getCookie('drf_token'))
    }
})
    .then(function (response) {
        // 성공했을 경우
        user_id = response.data['id'];
        if (check !== undefined) {
            document.getElementById('signup_button').innerHTML =
            "<a href=\"/accounts/retrieve_template/" + user_id + "\">\n" +
            "                MyPage\n" +
            "            </a>";
        }
    })


if (check !== undefined) {
    document.getElementById('login_button').innerHTML =
        "<a href=\"/accounts/logout_template/\">\n" +
        "                Logout\n" +
        "            </a>";
}