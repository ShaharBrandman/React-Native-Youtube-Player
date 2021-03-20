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

export async function playTrack() {
    //return if the youtube id is not valid
    if (!ytdl.validateURL(url)) { return Alert.alert('Youtube URL error:', 'URL is not valid') }
    
    //declare video which contains all of the custom youtube video details
    const video = await ytdl(url, { quality: 'highest' })
    
    //get details from video and store them in a variable
    const videoDetails = await ytdl.getInfo(url, { filter: format => format.container === 'audinoonly' })
    
    //get thumbnail url from videoDetails
    const thumbnailUrl = (((videoDetails['videoDetails'])['thumbnails'])[3])['url']

    //get videoUrl from video
    const videoUrl = (video[0])['url']
    
    //destory the current TrackPlayer if it is currently exists
    if (await TrackPlayer.getState() == await TrackPlayer.STATE_READY) {
        await TrackPlayer.destroy()
    }
   
    //setup a new TrackPlayer and add a new track to it
    //await purpose: don't continue without setting up the TrackPlayer
    await TrackPlayer.setupPlayer().then(async () => {
           const track = {
            id: 'default', //add id
            url: videoUrl, //add the new track
            title: `${(videoDetails['videoDetails'])['title']}`, //set title by the title of the new track
            artist: `${(videoDetails['videoDetails'])['ownerChannelName']}`, //set artist by the artist of the new track
            artwork: `${thumbnailUrl}` //set image by the image of the new track
          }
          
           //await purpose: don't continue without adding the Track to the queue
          await TrackPlayer.add(track)
    })
}
