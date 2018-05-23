## WAT

To comply with some standards of th GDPR/ DSVGO you nede to block any 3rd party sources before you have the consent of the user.
You can create platform/framework specific implementations and scan your website for those includes and ensure you never install a
wordpress/drupal/joomla/typo3 whatever plugin, suddenly loading something again ... or

You hard-enforce that using CSP headers platform independent.

TLDR: Implementation of a CSP based cookie switch to forbid loading ANY 3rd party resources without having the consent cookie set.

**This works for any website, any framework and is extremly simple, but yet very effective - no backend implementation needed** 

It will block anything (any domain not being the same domain as you website/platform):

 - Google Fonts
 - Recaptcha
 - any non local 3rd party domains like CDNs or similar
 - GA
 - any IFRAME
 - any external FONTS
 - any external JS
 - any external CSS
 - any ajax to external URLs
 
 If will allow ( even without consent):
 
 - any local CSS (local means same domain)
 - any local JS
 - any local AJAX
 - any local FONTS
 - any local ASSET(images, whatever)
 
 That means, you are on the safe side until the user user gives his consent.
 
 **Online Demo:** http://gdpr.kontextwork.de
 
 **This does not**:
 Offer you legal text or a convinient way to displaying what you are going to use to the user - that is up to you.
 Text, assets and convenience of informations is up to you.
 
 ## How can i use it for my website?
 
 **Online Demo:** http://gdpr.kontextwork.de
 
Since its implemented on the reverse-proxy you can put it anywhere and infront of anything. All you need is this javascript for the message

On you nginx you include this:

```
	location / {
		# better use map here
		if ($cookie_CONSENT != "i_confirmed_it") {
			add_header Cache-Control: "no-cache, no-store, must-revalidate";
			add_header X-Content-Type-Options nosniff;
			add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data: ";
		}
	}
```

```javascript
function gdpr_yes() {
    document.cookie = "CONSENT=i_confirmed_it";
    location.reload(true);
}

function gdpr_no() {
    console.log('Voted GDPR no - keeping restrictuions in place');
    document.cookie = 'CONSENT=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setTimeout(function(){ location.reload(true); }, 500);
}
``` 

And 'about' that html

```html
<div id="gdpr_message"> Are you ok with us working your data? <a href="javascript:gdpr_yes();">Yes</a><a href="javascript:gdpr_no();">No</a> </div>
```

You get it - its very simple, you can replace anything above with whay you like and all you need to do is set the cookie.

**`CONSENT` to `i_confirmed_it` and reload the page to unblock the external content again**
 
## Usage / Test

You cant use the **Online Demo:** http://gdpr.kontextwork.de
 
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
