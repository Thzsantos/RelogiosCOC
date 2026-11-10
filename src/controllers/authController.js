const bcrypt = require('bcryptjs');
const db = require('../config/database');
const generateToken = require('../utils/generateToken');

// Cadastrar
exports.cadastrar = async (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) return res.status(400).json({ msg: "preencha todos os campos" });

    // Verificar se email já existe
    const [existe] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);

    if (existe.length > 0) return res.status(409).json({ msg: "email já cadastrado" });

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Salvar no banco
    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senhaHash]);

    console.log("Usuário cadastrado!");

    return res.status(201).json({ msg: "usuário cadastrado com sucesso" });

};



// LOGIN
exports.login = async (req, res) => {

    const { email, senha } = req.body;

    // Verificar campos
    if (!email || !senha) return res.status(400).json({ msg: "preencha todos os campos😊😊🤣🤣😊😊" });

    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const usuario = rows[0];

    if (!usuario) return res.status(401).json({ msg: "NÃO TEM ISSO AQUI ZÉ😊😊🤣🤣😊😊" });



    // compare a senha
    const senhaOK = await bcrypt.compare(senha, usuario.senha)

  if (!senhaOK ) 
    return res.status(401).json({ msg: "Senha incorreta" });
      console.log(senhaOK);
};

// Dados vindos do front-end (exemplo)
this.login(
    {
        body: {
            nome: "yago",
            email: "ys@gmail.com",
            senha: "senha123"
        }
    },
    {
        status: codigo => ({
            json: dados => console.log(codigo, dados)
        })
    }
);