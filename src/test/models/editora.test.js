import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'Boitempo',
    cidade: 'São Paulo',
    email: 'boitempo@gmail.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve salvar editora no banco de dados', () => {
    const editora = new Editora(objetoEditora);

    editora.criar().then((dados) => {
      expect(dados.nome).toBe('Boitempo');
    });
  });

  it.skip('Deve salvar editora no banco de dados usando sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.criar();

    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
  });

  it('Deve fazer uma chamada simulada ao banco de dados', () => {
    const editora = new Editora(objetoEditora);

    editora.criar = jest.fn().mockReturnValue({
      id: 22,
      nome: 'Boitempo',
      cidade: 'São Paulo',
      email: 'boitempo@gmail.com',
      created_at: new Date(2001, 4, 9),
      updated_at: new Date(2023, 4, 9),
    });

    const retorno = editora.criar();
    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }),
    );
  });
});
