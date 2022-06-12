import FileService from '../Services/FileService.js';
import config from '../config.js';

export default class FileController {
    constructor() {
        this.getAll = this.get.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
        this.db = new FileService();
    }

    async get(req, res) {
        try {
            const files = await this.db.readAsync();
            if (!files) {
                res.status(404).json('Files was not found');
            } else {
                res.status(200).send(files);
                res.end();
            }
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }

    async post(req, res) {
        try {
            const entity = await this.db.createAsync(req.files.file, req.body);
            res.status(200).json(entity);
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    }

    async put(req, res) {
        try {
            const document = await this.db.updateAsync(
                req.params.id,
                req.files.file,
                req.body.title,
                req.body.description,
                req.body.genre
            );
            if (!document) {
                res.status(404).json('Files was not found');
            } else {
                res.status(200).json(document);
            }
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }

    async delete(req, res) {
        try {
            const document = await this.db.deleteAsync(req.params.id);

            res.status(200).json(document);
        } catch (e) {
            console.log(e);
            res.status(500).end();
        }
    }
}
