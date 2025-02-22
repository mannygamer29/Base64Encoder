/**
 * @name Base64Encoder
 * @author mannygamer29
 * @description Encodes outgoing messages into Base64 automatically.
 * @version 1.0.2
 * @source https://github.com/mannygamer29/Base64Encoder
 */

class Base64Encoder {
    start() {
        this.originalSendMessage = BdApi.findModuleByProps('sendMessage').sendMessage;
        this.patchSendMessage();
        BdApi.showToast('Base64 Encoder plugin started!');
    }

    stop() {
        this.unpatchSendMessage();
        BdApi.showToast('Base64 Encoder plugin stopped.');
    }

    patchSendMessage() {
        const messageModule = BdApi.findModuleByProps('sendMessage');
        const sendMessage = messageModule.sendMessage;

        messageModule.sendMessage = (channelId, message, ...args) => {
            if (message && typeof message.content === 'string') {
                try {
                    const encodedContent = btoa(unescape(encodeURIComponent(message.content)));
                    message.content = encodedContent;
                } catch (err) {
                    console.error('Failed to encode message:', err);
                }
            }
            return sendMessage.call(messageModule, channelId, message, ...args);
        };
    }

    unpatchSendMessage() {
        const messageModule = BdApi.findModuleByProps('sendMessage');
        if (this.originalSendMessage) {
            messageModule.sendMessage = this.originalSendMessage;
        }
    }
}

module.exports = Base64Encoder;
