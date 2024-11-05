import axios from 'axios';

const testConcurrency = async (numRequests = 5) => {
    try {
        // Array para armazenar as requisições
        const requests = [];

        // Loop para gerar os payloads e as requisições
        for (let i = 1; i <= numRequests; i++) {
            // Adiciona requisição de sucesso
            requests.push(axios.post('http://localhost:8000/orders/success', {
                user: {
                    firstName: `SUCESSO_${i}`,
                    lastName: `SUCESSO_${i}`
                },
                products: [
                    {
                        name: `SUCESSO_${i}`,
                        description: `SUCESSO_${i}`
                    },
                    {
                        name: `SUCESSO_${i}`,
                        description: `SUCESSO_${i}`
                    }
                ]
            }));

            // Adiciona requisição de falha
            requests.push(axios.post('http://localhost:8000/orders/failure', {
                user: {
                    firstName: `ERRO_${i}`,
                    lastName: `ERRO_${i}`
                },
                products: [
                    {
                        name: `ERRO_${i}`,
                        description: `ERRO_${i}`
                    },
                    {
                        name: `ERRO_${i}`,
                        description: `ERRO_${i}`
                    }
                ]
            }));
        }

        // Espera todas as requisições serem concluídas
        const results = await Promise.allSettled(requests);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Requisição ${index + 1} foi bem-sucedida.`, result.value.data);
            } else {
                console.log(`Requisição ${index + 1} falhou com erro:`, result.reason.toString());
            }
        });
    } catch (error) {
        console.error('Erro durante o teste de concorrência:', error);
    }
};

// Chama a função para testar concorrência com 5 requisições de sucesso e falha
testConcurrency(5);
