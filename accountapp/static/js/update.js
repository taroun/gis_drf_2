
function initialize (pk) {
    axios.get('/accounts/retrieve/' + pk )
      .then(function (response) {
        // handle success
        console.log(response);

        document.getElementById('username').value = response.data['username'];
        document.getElementById('email').value = response.data['email'];
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}

function update_account(pk) {
    axios.patch('/accounts/update/' + pk , {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
    })
      .then(function (response) {
        // handle success
        console.log(response);

        window.location.href = '/accounts/retrieve_template/' + pk ;
      })
      .catch(function (error) {
        // handle error
        console.log(error);

        document.getElementById('alert_box').innerHTML
             = "<div class='btn btn-danger rounded-pill px-5'>update가 실패 했습니</div>"

      })
      .then(function () {
        // always executed
      });
}