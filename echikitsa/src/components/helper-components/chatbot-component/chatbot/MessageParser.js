// MessageParser starter code in MessageParser.js
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("hello")) {
            this.actionProvider.greet();
        }

        if (lowerCaseMessage.includes("hospital")) {
            this.actionProvider.handleJavascriptList();
        }
    }
}

export default MessageParser;
