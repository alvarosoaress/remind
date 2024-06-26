const User = require('../models/userModel');
const generateToken = require("../functions/generateToken")

async function create(req, res) {
  const { nome, email, senha, cargo, setor, permissao } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409).json('Usuario ja existe');
  } else if (req.user.permissao === 0) {
    res
      .status(403)
      .json('Seu usuario nao tem permissao de criar uma nova conta');
  } else {
    try {
      const user = await User.create({
        nome,
        email,
        senha,
        cargo,
        setor,
        permissao,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json('Usuario não existe');
  }

  if (await user.matchPassword(senha)) {
    return res.status(200).json({
      _id: user.id,
      nome: user.nome,
      email: user.email,
      token: generateToken(user._id),
      permissao: user.permissao,
    });
  } else {
    return res.status(400).json('Email ou senha invalido');
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, cargo, setor, permissao, senha } = req.body;

    if (req.user.permissao === 0) {
      return res
        .status(403)
        .json('Seu usuário nao tem permissao de modificar conta');
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json('Usuário nao existe');
    }

    const duplicateUser = await User.findOne({ email });
    if (duplicateUser && String(duplicateUser._id) !== id) {
      return res.status(409).json('Email já cadastrado');
    }

    user.nome = nome || user.nome;
    user.email = email || user.email;
    user.cargo = cargo || user.cargo;
    user.setor = setor || user.setor;
    user.permissao = permissao || user.permissao;
    user.senha = senha || user.senha;

    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json(error);
  }
}

async function getById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

async function getAll(req, res) {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

async function deleteById(req, res) {
  if (req.user.permissao === 0) {
    res.status(403).json('Seu usuario nao tem permissao de deletar conta');
  } else {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      return res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Erro ao excluir usuário por ID:', error);
      return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}

module.exports = {
  create,
  login,
  update,
  getById,
  getAll,
  deleteById,
};