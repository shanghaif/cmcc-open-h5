(function () {
    if (document.scrollingElement) {
        return
    }
    var element = null;
    function scrollingElement () {
        if (element) {
            return element
        } else if (document.body.scrollTop) {
            // speed up if scrollTop > 0
            return (element = document.body)
        }
        var iframe = document.createElement('iframe');
        iframe.style.height = '1px';
        document.documentElement.appendChild(iframe);
        var doc = iframe.contentWindow.document;
        doc.write('<!DOCTYPE html><div style="height:9999em">x</div>');
        doc.close();
        var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight;
        iframe.parentNode.removeChild(iframe);
        return (element = isCompliant ? document.documentElement : document.body)
    }
    Object.defineProperty(document, 'scrollingElement', {
        get: scrollingElement
    })
})();