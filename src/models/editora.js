/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
class Editora {
  constructor({
    id,
    nome,
    cidade,
    email,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.nome = nome;
    this.cidade = cidade;
    this.email = email;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarEditoras() {
    return client.editoras.findMany();
  }

  static async pegarPeloId(id) {
    return client.editoras.findUnique({
      where: {
        id,
      },
    });
  }

  async criar() {
    return client.editoras.create({
      data: {
        ...this,
      },
    });
  }

  async atualizar(id) {
    return client.editoras.update({
      where: {
        id,
      },
      data: {
        ...this,
      },
    });
  }

  static async excluir(id) {
    return client.editoras.delete({
      where: {
        id,
      },
    });
  }

  static async pegarLivrosPorEditora(editoraId) {
    return client.livros.findMany({
      where: {
        editora_id: editoraId,
      },
    });
  }
}

export default Editora;
