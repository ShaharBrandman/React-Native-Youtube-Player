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
* create a new cuntplayer
*/
export function create() {
    if (TrackPlayer.getState() == TrackPlayer.STATE_READY) {
        TrackPlayer.destroy()
    }
    TrackPlayer.setupPlayer().then(() => { 
        const track = {
            id: 'default', //add id
            url: `${documentPath}/track.mp3`, //add the new track
            title: `${(videoDetails['videoDetails'])['title']}`, //set title by the title of the new track
            artist: `${(videoDetails['videoDetails'])['ownerChannelName']}`, //set artist by the artist of the new track
            artwork: `${thumbnailUrl}` //set image by the image of the new track
        }

        TrackPlayer.add(track)

        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP
            ]
        })

        TrackPlayer.registerPlaybackService( () => require('./service') )
    })

    console.log('cuntplayer is ready')
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
 * set a single track to be played in cuntplayer
 * @param {string[]} currentSong
 */
export function setSong(currentSong) {
    TrackPlayer.reset()
    TrackPlayer.add(track.url)
}

/**
 * Download a youtube video to the specifed path
 * @param {string} url
 * @returns {void}
 */
export async function download(url) {
    if (!ytdl.validateURL(url)) { return Alert.alert('Youtube URL error:', 'URL is not valid') }
    const video = await ytdl(url, { quality: 'highest' })
    const videoDetails = await ytdl.getInfo(url, { filter: format => format.container === 'audinoonly' })

    const thumbnailUrl = (((videoDetails['videoDetails'])['thumbnails'])[3])['url']

    const videoId = (video[0])['url']
    //const videoId = (((videoDetails['formats'])[0])['url'])

    await RNFetchBlob.config({
        path: `${documentPath}/track.mp3`,
        overwrite: true
    }).fetch('GET', videoId).progress((r, s) => {
        if (r == 0 && s == -1) {
            return Alert.alert('Sorry bruh please select a different song', 'Video cannot be downloaded, might be a proxy error')
        }
        console.log(`video: ${r} out of ${s}`)
    }).then(() => {
        if (TrackPlayer.getState() == TrackPlayer.STATE_READY) {
            TrackPlayer.destroy()
        }
        TrackPlayer.setupPlayer().then(() => { 
            const track = {
                id: 'default', //add id
                url: `${documentPath}/track.mp3`, //add the new track
                title: `${(videoDetails['videoDetails'])['title']}`, //set title by the title of the new track
                artist: `${(videoDetails['videoDetails'])['ownerChannelName']}`, //set artist by the artist of the new track
                artwork: `${thumbnailUrl}` //set image by the image of the new track
            }

            TrackPlayer.add(track)
        })

        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP
            ]
        })

        TrackPlayer.registerPlaybackService( () => require('./service') )

        console.log(`${url} has been downloaded!`)

    TrackPlayer.play()
    }).catch((e) => {
        console.error(`There was an error downloading ${url}`)
        return Alert.alert('Sorry bruh please select a different song', 'There was an error downloading the track')
    })
}

/**
 * get the duration of the current track
 * @returns {number}
 */
export function getDuration() {
    return TrackPlayer.getDuration()
}
