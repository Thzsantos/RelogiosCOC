
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const generateToken = require('../utils/generateToken');

// CADASTRAR
exports.cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                msg: "Preencha todos os campos"
            });
        }

        const [existe] = await db.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existe.length > 0) {
            return res.status(409).json({
                msg: "Email já cadastrado"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]
        );

        return res.status(201).json({
            msg: "Usuário cadastrado com sucesso"
        });

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            msg: "Erro interno do servidor"
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                msg: "Por favor insira o email ou senha."
            });
        }

        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        const usuarios = rows[0];

        if (!usuarios) {
            return res.status(401).json({
                msg: "Email ou senha incorreta"
            });
        }

        const senhaOK = await bcrypt.compare(
            senha,
            usuarios.senha
        );

        if (!senhaOK) {
            return res.status(401).json({
                msg: "Email ou senha incorreta"
            });
        }

        const token = generateToken(usuarios.id);

        return res.status(200).json({
            msg: "Login realizado com sucesso",
            token,
            usuario: {
                id: usuarios.id,
                nome: usuarios.nome,
                email: usuarios.email
            }
        });

    } catch (erro) {
        console.error("Erro no login:", erro);

        return res.status(500).json({
            msg: "Erro interno do servidor"
        });
    }
};
