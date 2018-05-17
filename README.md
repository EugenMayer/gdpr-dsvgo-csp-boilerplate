## WAT

Implementation of a CSP based cookie switch to forbind loading ANY 3rd party resources without having the consent cookie set.

Its done on the reverse proxy thus works for every system - no backend implementation needed and no case by case.

It will block anything:

 - Google Fonts
 - Recaptcha
 - any non local 3rd party domains like CDNs or similar
 - GA
 
 ## Usage / Test
 
    docker-compose up
    
Then access the example website under `http://somealias.lan:80` or whatever you `docker-machine` ip is.

Be sure to NOT use `localhost` since it has a special meaning in  CSP in a lot of cases (and its not our porduction case anyway)    