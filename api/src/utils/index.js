const {Character, Episode} = require('../db')
const axios = require('axios');
const apiCharacter = 'https://rickandmortyapi.com/api/character';

const getEpisodesMyDb = async(req, res)=>{
    try {
        const episodes = await Episode.findAll({
            attributes: ["id", "name"]
        });
        return episodes;
    } catch (error) {
        return res.status(400).send('Error en la extraccion de los datos de los episodios de la BD')
    }
}
const getCharactersMyDb = async(req, res) =>{
    try {
        const myDb = await Character.findAll({
            include:{
                model:Episode,
                attributes:['name'],
            }
        })
        return myDb;
    } catch (error) {
        return res.status(400).send(error+' Error al traer characters desde myDb')
    }
}
const getApiRickAndMorthi = async(req, res)=>{
    try {
        const episodes = await getEpisodesMyDb();
        const count = await(await axios.get(apiCharacter)).data.info.count;
        console.log(count)
        let characters = [];
        let address = '';
        while(characters.length < count){
            !characters.length && (address = apiCharacter);
            let {data} = await axios.get(address);
            characters = [...characters, ...data.results];
            address = data.info.next;
        }
       /*  while(characters.length<100){
            !games.length && (address = api);
            let {data} = await axios.get(address);
            characters = [...characters, ...data.results];
            address = data.info.next
        }
        */
       //characters = await(await axios.get(apiCharacter)).data.results;
       
        let apiRickAndMorthi = characters.map(el =>{
            return{
                id: el.id,
                name:el.name,
                species:el.species,
                origin:el.origin.name,
                image:el.image,
                created:el.created,
                episode: el.episode.map(url =>{
                    let id = url.split('/');
                    id = id[id.length-1];
                    for(let i=0; i<episodes.length; i++){
                        if(episodes[i].id == id)return episodes[i].name;
                    }
                })

            }
        }) 
        return apiRickAndMorthi;
    } catch (error) {
        throw new Error(error+' Error en la captura de personajes')
    }
}
const getAllCharacters = async(req, res)=>{
    try {
        const apiCharacters = await getApiRickAndMorthi();
        const dbCharacters = await getCharactersMyDb();
        const allCharacters = [...apiCharacters, ...dbCharacters];
        return allCharacters    
    } catch (error) {
        return res.status(400).send(error+' Error al momento de concatenar');
    }
}
module.exports = {getAllCharacters}