import sdcld from 'soundcloud-downloader'
import { getTracks } from './getTracks'
import fs from 'fs'

const checkEnv = async () => {
    const config = {
        desired_tracks : process.env.DESIRED_TRACKS,
        client_id : process.env.SOUNDCLOUD_CLIENT_ID,
        output_folder : process.env.OUTPUT_FOLDER_PATH,
        user_id : process.env.SOUNDCLOUD_USER_ID
    }
    console.log(config)
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function downloadTracks() {
    try {
        const infos = await getTracks(process.env.DESIRED_TRACKS)

        for (const info of infos) {

            console.log(`Processing ${info.Title}`)
            


            try {
                const stream = await sdcld.download(info.url)
                await sleep(200)
                stream.pipe(fs.createWriteStream(`${process.env.OUTPUT_FOLDER_PATH}/${info.Title}.mp3`))
                console.log(`Track ${info.Title} downloaded successfully`)
            } catch (err) {
                console.error(`Error downloading track ${info.Title}`, err)
            }
        }
    } catch (err) {
        console.error('Error fetching track IDs:', err)
    }
}

// Call the async function
checkEnv()
downloadTracks()
