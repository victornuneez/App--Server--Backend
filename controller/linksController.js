import Link from '../models/linkCollection.js';
import Tag from '../models/tagCollection.js';

// Falta agregar controlador para filtrar resultados por etiquetas

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
    res.status(201).json({ message: "Recurso creado exitosamente", data : savedItem });
};


const createTag = async(req, res) => {
    const { tag } = req.body;

    if(!tag) {
        res.status(400).json({ message: "Etiqueta no encontrada"});
    }

    const newTag = new Tag({ tag : tag });
    const savedTag = await newTag.save();

    res.status(200).json({ message: "Etiqueta creada exitosamente" });
};


const addComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userComment = { comment }

    const updateComment = await Link.findByIdAndUpdate(id, userComment, { returnDocument : 'after'});
    
    if(!updateComment) {
        return res.status(404).json({ message: "Enlace no encontrado" });
    }

    res.status(200).json({ message: "Comentario anahdido", data: updateComment})
};


const addVote = async (req, res) => {
    const { id } = req.params;
    const updateVote = await Link.findByIdAndUpdate(id, { $inc: { vote: 1 } }, { returnDocument : 'after'});
    
    if(!updateVote) {
        return res.status(404).json({ message: "Enlace no encontrado" });
    }

    res.status(200).json({ message: "Enlace votado correctamente", data: updateVote })
};


const linkDetail  = async (req, res) => {
    const { id } = req.params;
    const details = await Link.findById(id);

    if(!details) {
        return res.status(404).json({ message: "Enlace no encontrado"});
    }

    res.status(200).json({ message: "Detalle del enlace", data: details });
};

export { createLinks, createTag, addComment, addVote, linkDetail };