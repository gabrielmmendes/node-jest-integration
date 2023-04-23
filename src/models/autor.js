/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

class Autor {
  constructor({
    id,
    nome,
    nacionalidade,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarAutores() {
    return client.autores.findMany();
  }

  static async pegarPeloId(id) {
    return client.autores.findUnique({
      where: {
        id,
      },
    });
  }

  async criar() {
    return client.autores.create({
      data: {
        ...this,
      },
    });
  }

  async atualizar(id) {
    return client.autores.update({
      where: {
        id,
      },
      data: {
        ...this,
      },
    });
  }

  static async excluir(id) {
    return client.autores.delete({
      where: {
        id,
      },
    });
  }

  static async pegarLivrosPorAutor(autorId) {
    return client.livros.findMany({
      where: {
        autor_id: autorId,
      },
    });
  }
}

export default Autor;
