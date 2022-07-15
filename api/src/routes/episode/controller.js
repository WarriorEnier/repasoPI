const axios = require('axios');
const {Character, Episode} = require('../../db');
const apiEpisode = 'https://rickandmortyapi.com/api/episode';

const getAllEpisodes = async(req, res) =>{
     try {
        const count = await(await axios.get(apiEpisode)).data.info.count;
        let episodes = [];
        let address = '';
        
        while(episodes.length < count){
            !episodes.length && (address = apiEpisode);  
            let { data } = await axios.get(address);
			episodes = [...episodes, ...data.results];
			address = data.info.next;                 
        }
        let nameEpisodes = episodes.map(element => element.name)
        nameEpisodes.forEach(episode =>{
            Episode.findOrCreate({
                where:{name:episode}
            })
        })
        //
        const allEpisodesMyDb = await Episode.findAll()
       return res.status(200).send(allEpisodesMyDb) 
    } catch (error) {
        throw new Error(error)
    } 
}

module.exports = {getAllEpisodes}