const { NUMBER } = require('sequelize')
const database = require('../models')

class PessoaController {
    static async pegarTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaPessoa(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }})
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req,res) {
        const novaPessoa = req.body
        try {
            const novaPessoasCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoasCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarPessoa(req,res) {
        const { id } = req.params
        const novaInfo = req.body
        try {
            await database.Pessoas.update(novaInfo, {where: { id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async deletarPessoa(req,res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({where: { id: Number(id)}})
            return res.status(200).json({mensagem : `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController