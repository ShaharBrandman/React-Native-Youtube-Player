/*
cuntplayer/src/service.js
Author: Shahar Brandman (2021)
Provide playback service to cuntplayer
*/
import TrackPlayer from 'react-native-track-player'

module.exports = async function () {

    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener('remote-pause', () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.destroy()
    })
}