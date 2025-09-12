// Aqui vou colocar a URL real da API quando eu tiver essa url
const API_URL = 'https://sua-api.com/api/usuarios';

export async function cadastrarUsuario(usuario: {
  user: string;
  senha: string;
  nome: string;
}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (usuario.user && usuario.senha && usuario.nome) {
        resolve({ mensagem: 'Usuário cadastrado com sucesso' });
      } else {
        reject(new Error('Preencha todos os campos'));
      }
    }, 1000);
  });
}
