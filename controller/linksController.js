import Links from '../models/linkCollection.js';
import Tag from '../models/tagCollection.js';

const createLinks = async (req, res) => {
    const { title, url, tag } = req.body;
    
    // Validamos si completaron los campos de titulo y enlace
    if(!title || !url || !tag) {
        return res.status(400).json({ message : "Titulo, enlace o etiqueta no encontradas"});
    }
    
    // Verificamos si el titulo y enlace no es igual a alguno que ya tenemos en la DB.
    const existingTitle = await Links.findOne({ title : title});
    const existingLink = await Links.findOne({ url : url });
    
    if (existingTitle || existingLink) {
        return res.status(400).json({ message: "Titulo o Link existentes pruebe otro"});
    }
    
    // Buscamos si la etiqueta ya existe en la base de datos
    let userTag = await Tag.findOne({ tag: tag})

    // Si no existe la etiqueta en la base de datos, la creamos y la guardamos
    if(!userTag) {
        userTag = new Tag({ tag: tag });
        await userTag.save();
    }

    const newLink = new Links({ title, url, tag: userTag._id });
    const savedItem = await newLink.save();
    res.status(201).json({ message: "Recurso creado exitosamente", data : newLink });
};


const createTag = async(req, res) => {
    const { tag } = req.body;

    if(!tag) {
        res.status(400).json({ message: "Etiqueta no encontrada"});
    }

    const newTag = new Tag({ tag : tag });
    const savedTag = await newTag.save();
    res.status(200).json({ message: "Etiqueta creada exitosamente" })
}

export { createLinks, createTag };