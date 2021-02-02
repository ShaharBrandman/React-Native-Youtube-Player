/*
cuntplayer/src/service.js

Author: Shahar Brandman (2021)

Provide playback service to cuntplayer
*/
import TrackPlayer from 'react-native-track-player'

module.exports = async function() {
    
    TrackPlayer.addEventListener('remote-play', () => { 
        TrackPlayer.play()
        console.log('cuntplayer-youtube has remotly started playing')
     })
    TrackPlayer.addEventListener('remote-pause', () => { 
        TrackPlayer.pause()
        console.log('cuntplayer-youtube has been remotly paused!')
    })

    TrackPlayer.addEventListener('remote-stop', () => { 
        TrackPlayer.destroy()
        console.log('cuntplayer-youtube has been remotly destroyed!')
    })

    TrackPlayer.addEventListener('remote-jump-forward', async ({interval}) => {
        const pos = Number(await TrackPlayer.getPosition())
        await TrackPlayer.seekTo(pos + Number(interval))
        console.log(`cuntplayer-youtube has been skipped forward to ${pos + interval}`)
    })

    TrackPlayer.addEventListener('remote-jump-backward', async ({interval}) => {
        const pos = Number(await TrackPlayer.getPosition())
        await TrackPlayer.seekTo(pos - Number(interval))
        console.log(`cuntplayer-youtube has been skipped backward to ${pos + interval}`)
    })
}