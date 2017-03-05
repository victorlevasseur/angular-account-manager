onmessage = function(e) {
    console.log(e.data);
    postMessage([1, 2, 3]);
    close();
}
