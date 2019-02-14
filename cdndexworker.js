self.importScripts("https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js");
self.addEventListener('fetch',function(event) {
    //this new system only divides things into relative and absolute requests
    //that means you can only surf around one origin
    //base/redtoprox.html is special, it never gets proxied
    //only two files are necessary, this and redtoprox.html, both at root
    var url = new URL(event.request.url);
    console.log(url.href);//
    // I don't know why I decided to like codegolf this
    event.respondWith(idbKeyval.get('real').then(real=>idbKeyval.get('fake').then(fake=>{
        if (url.protocol == 'chrome-extension:') {
            return fetch(url.href);//fix firebug and stuff
        }
        // we've got real and fake
        if (url.origin == fake) {
            // Either it was a relative url, or /redtoprox.html
            if (url.pathname.indexOf('/redtoprox.html') > -1) {
                return fetch(fake+'/redtoprox.html');
            }
            if (url.pathname.indexOf('/cdndexworker.js') > -1) {
                return fetch(fake+'/cdndexworker.js');
            }
            return fetch(real+url.pathname+url.search);
        }
        return fetch('https://cors-anywhere.herokuapp.com/'+url.href);
    })));
});
