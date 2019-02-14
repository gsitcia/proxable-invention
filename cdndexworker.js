//self.importScripts("https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js");
self.addEventListener('fetch',function(event) {
    event.respondWith((function (req) {
        //return clients.matchAll().then(cl=>cl.length>0?new Response(cl[0].url):new Response(req.url));
        //return new Response(req.url);
        /*var url = new URL(req.url);
        if (url.hostname == "127.0.0.1") {
            return fetch(req.url);
        }
        /*return idbKeyval.get("url").then(url=>{
            return new Response(`<p>${url}</p>`,{
                headers: {"Content-Type":"text/html"}
            });
        });*/
        if (req.url.indexOf('proxiy') > -1) {
            //just a normal src="bob/joe" relative path
            //return new Response(req.url);
            return fetch('https://cors-anywhere.herokuapp.com/'+req.url.split('proxiy/')[1]);
        } else {
            //return new Response(req.url);
            // they did a src="/blah" request possibly
            var turl = new URL(req.url);
            var path = turl.pathname;
            return clients.matchAll().then(cl=>cl[0]).then(c=>{
                //return new Response(c.url);/*
                if ((new URL(c.url)).origin!=turl.origin) {//not a relative path
                    return fetch('https://cors-anywhere.herokuapp.com/'+req.url);
                }
                var url = c.url.split('proxiy/')[1];
                url = (new URL(url)).origin;
                url = 'https://cors-anywhere.herokuapp.com/'+url;
                return fetch(url+path);/**/
            });
        }
    })(event.request));
});
