// that is just an example, do whatever you like to set the cookie or remove it

function gdpr_yes() {
    document.cookie = "CONSENT=i_confirmed_it";
    location.reload();
}

function gdpr_no() {
    console.log('Voted GDPR no - keeping restrictuions in place');
    document.cookie = 'CONSENT=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function gdps_auto_hide_if_yes() {
    // thats a stupid test since we do not test for value being i_confirmed_it
    // but i dont dare implementing it vanilla
    // and yes === 0 means "exists"
    if (document.cookie.indexOf('CONSENT=') === 0) {
        document.getElementById('gdpr_message').remove();
    }
}

gdps_auto_hide_if_yes();