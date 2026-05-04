import Link from '../models/linkCollection.js';
import Tag from '../models/tagCollection.js';


const createLinks = async (req, res) => {
    try {

        const { title, url, tagName } = req.body;
        
        // Validamos si completaron los campos de titulo y enlace
        if(!title || !url || !tagName) {
            return res.status(400).json({ message : "Titulo, enlace o etiqueta no encontradas"});
        }
        
        // Verificamos si el titulo y enlace no es igual a alguno que ya tenemos en la DB.
        const existingLink = await Link.findOne({ url : url });
        
        if (existingLink) {
            return res.status(400).json({ message: "Link existente pruebe otro"});
        }
        
        // Buscamos si la etiqueta ya existe en la base de datos
        let tagDoc = await Tag.findOne({ name: tagName.trim() })
        
        // Si no existe la etiqueta en la base de datos, la creamos y la guardamos
        if(!tagDoc) {
            tagDoc = new Tag({ name: tagName.trim() });
            await tagDoc.save();
        }
        
        const newLink = new Link({ title, url, tag: tagDoc._id });
        const savedItem = await newLink.save();
        
        res.status(201).json({ message: "Recurso creado exitosamente", data : savedItem });
    
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }    
};


const createTag = async(req, res) => {
    const { tag } = req.body;
    
    try {
        if(!tag) {
            res.status(400).json({ message: "Etiqueta no encontrada"});
        }
        
        const newTag = new Tag({ tag : tag });
        const savedTag = await newTag.save();
        
        res.status(200).json({ message: "Etiqueta creada exitosamente" });
    
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};


const addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const updateComment = await Link.findByIdAndUpdate(
            id, 
            {$push: { comments: text }},
            { returnDocument : 'after'}
        );
        
        if(!updateComment) {
            return res.status(404).json({ message: "Enlace no encontrado" });
        }
        
        res.status(200).json(updateComment);
    
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};


const addVote = async (req, res) => {
    const { id } = req.params;

    try {
        const updateVote = await Link.findByIdAndUpdate(id, { $inc: { vote: 1 } }, { returnDocument : 'after'});
        
        if(!updateVote) {
            return res.status(404).json({ message: "Enlace no encontrado" });
        }
        
        res.status(200).json({ message: "Enlace votado correctamente", data: updateVote })
    
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};




export { createLinks, createTag, addComment, addVote };