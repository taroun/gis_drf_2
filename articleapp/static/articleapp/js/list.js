function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function initialize() {
    axios({
        method: 'get',
        url: '/articles/',
        headers: {
            Authorization: decodeURIComponent(getCookie('drf_token')),
        }
    })
        .then(function (response) {
            // handle success
            console.log(response);

            for (let i=0; i < response.data['results'].length; i++) {
                document.getElementById('article_list').innerHTML
                    +=
                    "<div>" +
                    "<a href=\"/articles/retrieve_template/" + response.data['results'][i]['id'] + "\">" +
                    "<img style=\"width: 100%; border-radius: 1rem;\"" +
                    " src=\"" + response.data['results'][i]['image'] + "\"" +
                    " alt=\"\">" +
                    "</a>" +
                    "</div>";
            }

            let magicGrid = new MagicGrid({
                container: '.container',
                animate: true,
                gutter: 20,
                static: true,
                useMin: true
            });

            magicGrid.listen();

            var pagination = document.getElementById('pagination')

            if(response.data['previous'] !== null) {
                pagination.innerHTML +=
                    "<a href=\"" + response.data['previous'] + "\"" +
                    "   class=\"btn btn-secondary rounded-pill px-5 mx-3\">" +
                    "Previous" +
                    "</a>";
            }
            pagination.innerHTML +=
                "<a href=\"#\"" +
                "   class=\"btn btn-dark rounded-pill px-5 mx-3\">" +
                "Current" +
                "</a>";
            if(response.data['next'] !== null) {
                pagination.innerHTML +=
                    "<a href=\"" + response.data['next'] + "\"" +
                    "   class=\"btn btn-secondary rounded-pill px-5 mx-3\">" +
                    "Next" +
                    "</a>";
            }

            document.getElementById('article_list').style.height='100%';
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}