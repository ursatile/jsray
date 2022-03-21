export default function sleep(seconds) {
    var stop = new Date();
    stop.setSeconds(stop.getSeconds() + seconds);
    while (new Date() < stop) {
        // do nothing.
    }
}
