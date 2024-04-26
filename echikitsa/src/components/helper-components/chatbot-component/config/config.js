import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Chikitsa Bot';

const config = {
    initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. I'm here to help. First, can you please tell me who are you?`)],
    botName: botName,
    customStyles: {
        botAvatar: {
            backgroundColor: '#000000',
        },
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: '#000000',
        },
    },
};

export default config;