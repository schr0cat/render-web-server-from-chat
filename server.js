const WebSocket = require('ws');

// Создание WebSocket сервера, который будет слушать на порту 8080
const wss = new WebSocket.Server({ port: 8080 });

// Обработка подключения клиента
wss.on('connection', (ws) => {
    console.log('Новый клиент подключен');

    // При получении сообщения от клиента
    ws.on('message', (data) => {
        const message = JSON.parse(data); // Парсим JSON-данные
        console.log(`Получено сообщение: ${message.text}`);

        // Отправляем сообщение обратно всем подключённым клиентам
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ text: message.text })); // Отправляем как JSON
            }
        });
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('Клиент отключен');
    });
});

console.log('WebSocket сервер запущен на порту 8080');