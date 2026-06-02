import Link from '../models/linkCollection.js';
import Tag from '../models/tagCollection.js';

// Funcion que obtiene un enlace especifico por medio del id.
const getLinkDetailsById = async (req, res) => {
    const { id } = req.params; // params se usa cuando se quiere un recurso especifico.
    try {
        const link = await Link.findById(id).populate('tag','name');
        if(!link) {
            return res.status(404).json({ message: "Enlace no encontrado" });
        }

        res.status(200).json(link);
    
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Funcion que filtra los enlaces por medio de la id de la etiqueta recibida.
const filterLinksByTag = async (req, res) => {
    const { id } = req.query; // La query filtran conjuntos de datos
    let filter = {};

    try {
        if(id && id !== "Todos") {
            const tagDoc = await Tag.findById(id);
            if(!tagDoc) return res.status(404).json({ message: "Etiqueta no encontrada"});
            filter = {tag: id};
        }

        // Si el id de la tag no viene en la URL, filter queda como un objeto vacio y Mongoose devuelve todo.
        const links = await Link.find(filter).populate('tag','name');
        res.status(200).json(links);

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Funcion que devuelve todas las etiquetas encontradas en la DB.
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }

};

export { getLinkDetailsById, filterLinksByTag, getAllTags };