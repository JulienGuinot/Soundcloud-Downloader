const myHeaders = new Headers();
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0");
myHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
myHeaders.append("Accept-Language", "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3");
myHeaders.append("Accept-Encoding", "gzip, deflate, br, zstd");
myHeaders.append("Referer", "https://soundcloud.com/");
myHeaders.append("Origin", "https://soundcloud.com");
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-site");
myHeaders.append("Connection", "keep-alive");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};




const getInfos = (collection) => {
    let TrackInfos = []
    collection.forEach(object => {
        const TrackInfo = {
            url : object.track.permalink_url,
            Title: object.track.title
        .replace(/[\/\?<>\\:\*\|"]/g, '-')  // Remplace les caractères interdits
        .replace(/[\x00-\x1F\x80-\x9F]/g, '')  // Supprime les caractères de contrôle
        .trim()  // Supprime les espaces en début/fin
        }
        
        console.log(TrackInfo)
        TrackInfos.push(TrackInfo)
    });
    return TrackInfos

}

export const getTracks = async (limit) => {

        const response = await fetch(`https://api-v2.soundcloud.com/users/${process.env.SOUNDCLOUD_USER_ID}/track_likes?limit=${limit}&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}&app_version=1740395400&app_locale=en`,requestOptions)
        const data = await response.json()
        const collection = data.collection
        const infos = getInfos(collection)

    return infos

}





