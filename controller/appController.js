import Link from '../models/linkCollection.js';
import Tag from '../models/tagCollection.js';

const getLinkDetails = async (req, res) => {
    const { id } = req.params; // params se usa cuando se quiere un recurso especifico.

    try {
        const link = await Link.findById(id).populate('tag','name');

        if(!link) {
            return res.status(404).json({ message: "Recurso no encontrado" });
        }

        res.status(200).json(link);
    
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

const filterTags = async (req, res) => {
    const { id } = req.query; // La query filtran conjuntos de datos
    let filter = {};

    try {
        if(id && id !== "Todos") {
            const tagDoc = await Tag.findOne({ tag : id });
            filter = {tag: id};
        }

        // Si tag no viene en la URL, filter queda como un objeto vacio y Mongoose devuelve todo.
        const links = await Link.find(filter).populate('tag','name');
        res.status(200).json(links);

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }

};

export { getLinkDetails, filterTags, getTags };