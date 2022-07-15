const { default: axios } = require('axios');
const {getAllCharacters} = require('../../utils/index');

const getCharacters = async(req, res)=>{
    const {id} = req.params;
    try {

        const characters = await getAllCharacters();
        //console.log(characters.length)
        console.log(id)
        if(id){
            let characterId = characters.filter(character =>character.id == id);
            characterId.length
                ? res.status(200).send(characterId)
                : res.status(400).send(`No se encontro ninguna coincidencia con el ID: ${id} `);
        }
        return res.status(200).send(characters)
    } catch (error) {
        return res.status(404).send('NO entramos en el getCharacters')
    }
}

module.exports = {getCharacters}