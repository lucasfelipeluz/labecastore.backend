const path = require('path')
const fs = require('fs')
const mime = require('mime')
const aws = require('aws-sdk')

const uploadConfig = require('../config/upload');

/* Classe responsável por se conectar com AWS S3 */
class S3Storage {
  constructor() {
    this.client = new aws.S3({
      region: process.env.aws_region
    });

  }

  /* Salvar Arquivo no Bucket */
  async saveFile(filename) {
    const originalPath = path.resolve(uploadConfig.directory, filename);

    const ContentyType = mime.getType(originalPath);

    if (!ContentyType) {
      throw new Error('file not found')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    try {
      this.client.putObject({
        Bucket: process.env.aws_bucket_name,
        Key: filename,
        Body: fileContent,
      }).promise()

      await fs.promises.unlink(originalPath)

      return { status: true, data: [] }
      
    } catch (error) {
      console.log(error)
      return { status: false, data: [] }
    }

  }

  /* Deletar Arquivo no Bucket */
  async deleteFile(filename) {
    const params = {
      Bucket: process.env.aws_bucket_name,
      Key: filename
    }
  try {
    this.client
      .deleteObject(params, (err) => {
        if (err) throw 'Erro Interno';
      }).promise
    
    return { status: true, data: [] }
  } catch (error) {
    console.log(error)
    return { status: false, data: [] }
  }
  }

  /* Retorna a Url do Arquivo */
  async getUrl(filename) {
  try {
    const data = this.client.getSignedUrl('getObject', {
      Bucket: process.env.aws_bucket_name,
      Key: filename
    })

    return { status: true, data, }
  } catch (error) {
    console.log(error)
    return { status: false, data: [] }
  }
  }

}

module.exports = new S3Storage();