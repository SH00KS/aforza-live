<template>
  <div class="messenger-container">
    <div class="message-history-header">
      <div class="current-user-name">
        Message<span class="active-status-dot"></span>
      </div>
      <div class="last-seen">Last seen ... 10/Aug/22 12:03</div>
    </div>
    <div class="message-history-container">
      <div
        v-for="message in messagesSortedByDate"
        :key="message.id"
        class="messages"
      >
        <div v-if="message.CurrentUser" class="user-message-bubble">
          {{ message.MessageText }}
        </div>
        <div v-else class="rep-message-bubble">{{ message.MessageText }}</div>
      </div>
    </div>
    <div class="message-history-input">
      <form class="message-input-form" @submit.prevent="sendMessage">
        <input
          class="message-input"
          v-model="newMessage"
          :placeholder="messagePlaceholder"
        />
        <button class="message-button"><send-icon /></button>
      </form>
    </div>
  </div>
</template>

<script>
import SendIcon from "vue-material-design-icons/Send.vue";
import EmoticonOutlineIcon from "vue-material-design-icons/EmoticonOutline.vue";
export default {
  data() {
    let userMessageHistory = [];
    let latestMessageId = 0;
    if (this.User.MessageHistory && this.User.MessageHistory.length > 0) {
      userMessageHistory = this.User.MessageHistory;
      latestMessageId = userMessageHistory[userMessageHistory.length - 1].id;
    }
    return {
      latestMessageId: latestMessageId,
      newMessage: "",
      currentUser: this.User,
      userMessageHistory: userMessageHistory,
    };
  },
  components: {
    SendIcon: SendIcon,
    EmoticonIcon: EmoticonOutlineIcon,
  },
  props: ["User"],
  methods: {
    sendMessage() {
      this.userMessageHistory.push({
        id: this.latestMessageId++,
        MessageText: this.newMessage,
        CurrentUser: true,
        SendTime: new Date(Date.now()).toISOString(),
      });
      if (
        this.currentUser.Name === "Jerry Cabbage" &&
        this.latestMessageId === 3
      ) {
        setTimeout(() => {
          this.userMessageHistory.push({
            id: this.latestMessageId++,
            MessageText: "Okay I will finish up for today, thanks",
            CurrentUser: false,
            SendTime: new Date(Date.now()).toISOString(),
          });
        }, 4000);
      } else if (
        this.currentUser.Name === "Terisa Olive" &&
        this.latestMessageId === 7
      ) {
        this.userMessageHistory.push({
          id: this.latestMessageId++,
          MessageText: "Yep that's fine, I'll stop there next.",
          CurrentUser: false,
          SendTime: new Date(Date.now()).toISOString(),
        });
      }
      this.newMessage = "";

      const messageContainer = this.$el.querySelector(
        ".message-history-container"
      );
      setTimeout(() => {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }, 600);
    },
  },
  mounted() {
    const messageContainer = this.$el.querySelector(
      ".message-history-container"
    );
    messageContainer.scrollTop = messageContainer.scrollHeight;
  },
  computed: {
    messagePlaceholder() {
      return "Message " + this.currentUser.Name + "...";
    },
    messagesSortedByDate() {
      if (this.userMessageHistory.length > 1) {
        const copiedList = [...this.userMessageHistory];
        return copiedList.sort((a, b) => {
          return a.SendTime < b.SendTime ? -1 : a.SendTime > b.SendTime ? 1 : 0;
        });
      } else {
        return this.userMessageHistory;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.messages:first-child {
  margin-top: auto;
}

.messenger-container {
  height: 75%;
  width: 90%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgb(149 157 165 / 43%) 0px 8px 24px;
  margin-top: 115px;
  margin-bottom: 10px;
  margin-left: 43px;
}

.message-history-header {
  height: 10%;
  display: flex;
  align-items: center;
}

.message-history-container {
  display: flex;
  flex-direction: column;
  row-gap: 35px;
  height: 100%;
  overflow: auto;
  background-color: rgb(0 0 0 / 5%);
  padding: 20px;
}

.message-history-input {
  height: 10%;
  margin: 10px;
}

.message-input-form {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.message-input {
  height: 100%;
  border: 0;
  padding: 0;
  padding-left: 10px;
  width: 100%;
  border-radius: 5px;
}

.message-button {
  height: 100%;
  width: 100px;
  background-color: #2CBCB2;
  border: 0;
  cursor: pointer;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.5);
}

.active-status-dot {
  height: 10px;
  width: 10px;
  background-color: #32AE40;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
}

.current-user-name {
  font-size: 15px;
  margin-left: 10px;
  font-weight: bold;
}

.last-seen {
  font-size: 12px;
  margin-left: 10px;
  font-style: italic;
}

.rep-message-bubble {
  color: white;
  border-radius: 10px;
  margin-left: 7px;
  width: max-content;
  padding: 15px;
  background-color: #2200b7;
  max-width: 80%;
  box-shadow: rgb(149 157 165 / 65%) 0px 8px 24px;
  text-align: initial;
}

.user-message-bubble {
  color: rgba(0, 0, 0, 1);
  border-radius: 10px;
  width: max-content;
  margin-left: auto;
  margin-right: 7px;
  padding: 15px;
  background-color: #46CCC2;
  max-width: 80%;
  box-shadow: rgb(149 157 165 / 65%) 0px 8px 24px;
  text-align: initial;
}

*:focus {
  outline: none;
}
</style>