## WAT

Implementation of a CSP based cookie switch to forbind loading ANY 3rd party resources without having the consent cookie set.

**This works for any website, any framework and is extremly simple, but yet very effective - no backend implementation needed** 

It will block anything:

 - Google Fonts
 - Recaptcha
 - any non local 3rd party domains like CDNs or similar
 - GA
 - any iframe
 - any external form
 - any external js
 - any external CSS
 
 That means, you are on the safe side until the user accepts your cookie.
 
 ## Where can i use it?
 
Well anywhere - since its implemented on the reverse-proxy you can put it anywhere. All you need is this javascript for the message
 
```javascript
function gdpr_yes() {
    document.cookie = "CONSENT=i_confirmed_it";
    location.reload();
}


function gdpr_no() {
    console.log('Voted GDPR no - keeping restrictuions in place');
    setCookie('CONSENT', 'false', 0)
}
``` 

And 'about' that html

```html
<div id="gdpr_message"> Are you ok with us working your data? <a href="javascript:gdpr_yes();">Yes</a><a href="javascript:gdpr_no();">No</a> </div>
```

You get it - its very simple, you can replace anything above with whay you like and all you need to do is set the cookie 

**`CONSENT` to `i_confirmed_it` and reload the page to unblock the external content again**
 
## Usage / Test
 
    docker-compose up
    
Then access the example website under `http://somealias.lan:80` or whatever you `docker-machine` ip is.
Be sure to NOT use `localhost` since it has a special meaning in  CSP in a lot of cases (and its not our porduction case anyway)

Now just visit the website, check all the tests like iframe, fonts, js, css and so on. Then click on yes and see what happens

## How does it work

It uses CSP headers on nginx:     