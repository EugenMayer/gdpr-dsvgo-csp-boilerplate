## WAT

Implementation of a CSP based cookie switch to forbid loading ANY 3rd party resources without having the consent cookie set.

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
 
 **Online Demo:** http://gdpr.kontextwork.de
 
 ## How can i use it for my website?
 
Since its implemented on the reverse-proxy you can put it anywhere. All you need is this javascript for the message

On you nginx you include this:

```
location / {
		if ($cookie_CONSENT != "i_confirmed_it") {
			add_header X-Frame-Options SAMEORIGIN;
			add_header X-Content-Type-Options nosniff;
			add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data: ";
		}
	}
```

```javascript
function gdpr_yes() {
    document.cookie = "CONSENT=i_confirmed_it";
    location.reload();
}

function gdpr_no() {
    console.log('Voted GDPR no - keeping restrictuions in place');
    document.cookie = 'CONSENT=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
``` 

And 'about' that html

```html
<div id="gdpr_message"> Are you ok with us working your data? <a href="javascript:gdpr_yes();">Yes</a><a href="javascript:gdpr_no();">No</a> </div>
```

You get it - its very simple, you can replace anything above with whay you like and all you need to do is set the cookie.

**`CONSENT` to `i_confirmed_it` and reload the page to unblock the external content again**
 
## Usage / Test
 
    docker-compose up
    
    # or
    
    docker run -p 80:80 eugenmayer/eugenmayer/gdpr-csp-nginx
    
Then access the example website under `http://somealias.lan:80` or whatever you `docker-machine` ip is.
Be sure to NOT use `localhost` since it has a special meaning in  CSP in a lot of cases (and its not our porduction case anyway)

Now just visit the website, check all the tests like iframe, fonts, js, css and so on. Then click on yes and see what happens

## How does it work

It uses CSP headers on nginx: https://github.com/EugenMayer/gdpr-dsvgo-csp-boilerplate/blob/master/nginx/server.conf#L11
It adds those headers to block any external content as long as the cookie `CONSENT` is not set to  `i_confirmed_it`.

That's it. 