/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

class Livro {
  constructor({
    id,
    titulo,
    paginas,
    editora_id,
    autor_id,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.titulo = titulo;
    this.paginas = paginas;
    this.editora_id = editora_id;
    this.autor_id = autor_id;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarLivros() {
    return client.livros.findMany();
  }

  static async pegarPeloId(id) {
    return client.livros.findUnique({
      where: {
        id,
      },
    });
  }

  async criar() {
    return client.livros.create({
      data: {
        ...this,
      },
    });
  }

  async atualizar(id) {
    return client.livros.update({
      where: {
        id,
      },
      data: {
        ...this,
      },
    });
  }

  static async excluir(id) {
    return client.livros.delete({
      where: {
        id,
      },
    });
  }
}

export default Livro;
