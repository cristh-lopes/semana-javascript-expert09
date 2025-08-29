// @ts-check

/**
 * @typedef {import("../views/chatBotView.js").ChatbotView} ChatBotView
 * @typedef {import("../services/promptService.js").PromptService} PromptService
 */

export class ChatbotController {
  #chatbotView;
  #promptService;

  /**
   * @param {Object} deps - Dependencies for the class.
   * @param {ChatBotView} deps.chatbotView - The chatbot view instance.
   * @param {PromptService} deps.promptService - The prompt service instance.
   */
  constructor({ chatbotView, promptService }) {
    this.#chatbotView = chatbotView;
    this.#promptService = promptService;
  }

  async init({ firstBotMessage, text }) {
    this.#setupEvents();
    this.#chatbotView.renderWelcomeBubble();
    this.#chatbotView.setInputEnabled(true);
    this.#chatbotView.appendBotMessage(firstBotMessage, null, false);
  }

  #setupEvents() {
    this.#chatbotView.setupEventHandlers({
      onOpen: this.#onOpen.bind(this),
      onSend: this.#chatBotReply.bind(this),
      onStop: this.#handleStop.bind(this),
    });
  }

  #handleStop() {}

  async #chatBotReply(userMsg) {
    console.log("received", userMsg);
    this.#chatbotView.showTypingIndicator();
    this.#chatbotView.setInputEnabled(false);
    setTimeout(() => {
      this.#chatbotView.appendBotMessage(
        "Opa! Ainda não estou pronto para isso.",
        null,
        false
      );
      this.#chatbotView.setInputEnabled(true);
      this.#chatbotView.hideTypingIndicator();
    }, 500);
  }

  async #onOpen() {
    this.#chatbotView.setInputEnabled(true);
  }
}
