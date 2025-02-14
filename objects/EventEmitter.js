/**
 * A static class used to emit events to the parent window.
 */
class EventEmitter {
    static emit( data ) {
        if( typeof(window.gameEventCallback) === 'function' )
        {
            window.gameEventCallback(data);
        }
        else if( typeof(window.opener?.postMessage) === 'function' )
        {
            window.opener.postMessage(data, '*');
        }
    }
}
