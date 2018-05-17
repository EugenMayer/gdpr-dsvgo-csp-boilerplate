function changeColor() {
    document.getElementById('internal-js-test').style.color = "blue";
}

function gdpr_yes() {
    document.cookie = "CONSENT=i_confirmed_it";
    location.reload();
}


function gdpr_no() {
    console.log('Voted GDPR no - keeping restrictuions in place');
    setCookie('CONSENT', 'false', 0)
}