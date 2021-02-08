/*
cuntplayer/src/cuntplayer.js

Author: Shahar Brandman (2021)

The whole source code for the background youtube player
*/
import React from 'react'
import { Alert } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import RNFetchBlob from 'rn-fetch-blob'
import ytdl from 'react-native-ytdl'

export const downloadPath = RNFetchBlob.fs.dirs.DownloadDir
export const documentPath = RNFetchBlob.fs.dirs.DocumentDir

/**
* current track details
*/
export let track = {
    id: 'default',              //default id
    url: 'None',                //default url
    title: 'Default Song',      //default title
    artist: 'idk',              //default artist
    album: 'Lonely Album :(',   //default album
    image: 'idk'                //default image
}

/**
* current queue details
* @type {string[]}
*/
export let queue = []
    
//current cuntplayer state
export let cuntplayerState = { //default state
    loop: false,
    queueLoop: false,
    eternalLoop: false
}
    
/**
* create a new cuntplayer
*/
export function create() {
    React.useEffect(() => {
        TrackPlayer.setupPlayer().then(() => {
                
            TrackPlayer.registerPlaybackService(() => require('./service'))
                
            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP,
                    TrackPlayer.CAPABILITY_JUMP_FORWARD,
                    TrackPlayer.CAPABILITY_JUMP_BACKWARD
                ],
                jumpInterval: 30
            })

            console.log('cuntplayer-youtube is ready!')

            reset()
        })
    })
}

/**
* destroy the current cuntplayer
*/
export function kill() {
    TrackPlayer.destroy().then(() => {
        console.log('cuntplayer-youtube has been destroyed!')
    })
}

/**
 * resets all of cuntplayer's track, state and queue
 */
export function reset() {
    track = {
        id: 'default',
        url: 'None',
        title: 'Default Song',
        artist: 'idk',
        album: 'Lonely Album :(',
        image: 'idk'
    }

    cuntplayerState = {
        loop: false,
        queueLoop: false,
        eternalLoop: false
    }

    queue = []

    console.log('cuntplayer-youtube has been reset!')

}

/**
* play cuntplayer
*/
export function play() {
    TrackPlayer.play()
    console.log('cuntplayer-youtube has started playing!')
}

/**
* pause cuntplayer
*/
export function pause() {
    TrackPlayer.pause()
    console.log('cuntplayer-youtube has been paused!')
}

/**
* play cuntplayer if it is pause
* pause cuntplayer if it is playing 
*/
export function playOrPause() {
    console.log('Play/Pause button has been pressed')
    if (isPLaying()) {
        play()
    }
    else {
        pause()
    }
}

/**
* make cuntplayer skip/seek to a specific time in the track
* @param {number} time 
*/
export function seekTo(time) {
    TrackPlayer.seekTo(time)
    console.log(`cuntplayer has seeked to ${time}`)
}

/**
* skip to the specific song in the queue
* @param {string} track 
*/
export function skipTo(track) {
    TrackPlayer.skip(track)
}

/**
* true if cuntplayer is currently playing a song
*/
export function isPLaying() {
    return true ? TrackPlayer.getState() == TrackPlayer.STATE_PLAYING : false
}

/**
* return true if cuntplayer is currently loading
*/
export function isLoading() {
    return true ? TrackPlayer.getState() == TrackPlayer.STATE_BUFFERING : false
}

/**
* play the next song in the queue if there is one
*/
export function nextSong() {
    TrackPlayer.skipToNext()
    console.log('cuntplayer skipped to play its next song')
}

/**
* play the previous song in the queue if there is one
*/
export function previousSong() {
    TrackPlayer.skipToPrevious()
    console.log('cuntplayer skipped to play its previous song')
}

/**
* make cuntplayer play the current song in a loop
* will stop if the pause button will be pressed but will not stop looping the song afterwards
*/
export function loop() {
    if (cuntplayerState.loop == true) {
        cuntplayerState.loop = false
        console.log('looping current track has stopped')
    }
    else {
        cuntplayerState.loop = true
        console.log('looping current track has started')
    }
}

/**
* return true if cuntplayer is looping the current song
*/
export function isLooping() {
    return cuntplayerState.loop
}

/**
* make cuntplayer play the same playlist/queue in a loop
* will stop if the pause button will be pressed but will not stop looping the queue afterwards
*/
export function loopQueue() {
    if (cuntplayerState.queueLoop == true) {
        cuntplayerState.queueLoop = false
        console.log('Queue looping has stopped')
    }
    else {
        cuntplayerState.queueLoop = true
        console.log('Queue looping has started')
    }
}

/**
* return true if cuntplayer is looping the current song
*/
export function isLoopingQueue() {
    return cuntplayerState.queueLoop
}

/**
* make cuntplayer play the same song in a loop until this feature is disabled
* will not stop if the pause button will be pressed
*/
export function eternalLoop() {
    if (cuntplayerState.eternalLoop == true) {
        cuntplayerState.eternalLoop = false
        console.log('Eternal looping has stopped')
    }
    else {
        cuntplayerState.eternalLoop = true
        console.log('Eternal looping has started')
    }
}

/**
* return true if cuntplayer is eternal looping
*/
export function isLoopingEternally() {
    return cuntplayerState.eternalLoop
}

/**
 * set a single track to be played in cuntplayer
 * @param {string[]} currentSong
 */
export function setSong(currentSong) {
    track.id = currentSong.id
    track.url = currentSong.url
    track.title = currentSong.title
    track.artist = currentSong.artist
    track.album = currentSong.album

    TrackPlayer.add(track.url).then(() => {
        console.log('Track has been updated as a single song')
        console.log(`
        Track details: \n
        =========== \n
        ID: ${track.id} \n
        SOURCE: ${track.url} \n
        TITLE: ${track.title} \n
        ARTIST: ${track.artist} \n
        ALBUM: ${track.album} \n
        ===========
        `)
    })
}

/**
 * return the current song that is playing or current playing song in the queue
 * @returns {string[]} track
 */
export function getSong() {
    return track
}

/**
 * set a list of songs for the cuntplayer to play as a queue
 * @param {string[]} q
 */
export function setQueue(q) {
    queue = q

    TrackPlayer.add(q).then(() => {
    console.log('Track has been updated as queue')
    console.log(`
        Tracks in Queue:    \n
        ===========         \n
        ${q}                \n
         ===========
        `)
    })
}

/**
* get all the songs and their details that are in the queue or there is one
* @returns {string[]} queue
*/
export function getQueue() {
    return queue
}

/**
 * Download a youtube video to the specifed path
 * @param {string} url
 * @returns {void}
 */
export async function download(url) {
    if (!ytdl.validateURL(url)) { return Alert.alert('Youtube URL error:', 'URL is not valid') }
    //const video = await ytdl(url, { quality: 'highestaudio' })
    const video = await ytdl.getInfo(url, { quality: 'highestaudio' })

    const thumbnailUrl = (((video['videoDetails'])['thumbnails'])[3])['url']
    const videoId = ((video['formats'])[10])['url']

    RNFetchBlob.config({
        path: `${documentPath}/track.mp3`,
        overwrite: true
    }).fetch('GET', videoId).progress((r, s) => {
        console.log(`${r} out of ${s}`)
    }).then(() => {
        console.log(`${url} has been downloaded!`)
    }).catch(() => {
        return console.error(`There was an error downloading ${url}`)
    })

    RNFetchBlob.config({
        path: `${documentPath}/track.png`,
        overwrite: true
    }).fetch('GET', thumbnailUrl).progress((r, s) => {
        console.log(`${r} out of ${s}`)
    }).then(() => {
        console.log(`the thumbnail has been downloaded!`)
    }).catch(() => {
        return console.error(`There was an error downloading ${thumbnailUrl}`)
    })
}

/**
 * get the duration of the current track
 * @returns {number}
 */
export function getDuration() {
    return TrackPlayer.getDuration()
}
