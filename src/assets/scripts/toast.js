// Toast Notification
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import RepNotificationContent from "../../components/RepNotificationContent.vue";
import { Data } from "../../data.js";

const statusBackgrounds = Object.freeze({
  success: "white",
  warning: "#2200b7",
  info: "#2200b7",
  danger: "#EF476F"
});

const playSound = (sound) => {
  if (sound) {
    var audio = new Audio(sound);
    audio.play();
    console.log("trying to play " + sound);
  }
};

export const toastMsg = (message, rep, type = "success") => {
  console.log(rep);

  playSound(
    "http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"
  );

  if (rep === null) {
    return createToast(message, {
      type,
      position: "bottom-right",
      transition: "bounce",
      hideProgressBar: false,
      showIcon: false,
      timeout: 5000,
      toastBackgroundColor: "#2200b7"
    });
  } else {
    return createToast(
      withProps(RepNotificationContent, {
        rep: rep,
        message: rep.Name + " " + message
      }),
      {
        position: "bottom-right",
        toastBackgroundColor: statusBackgrounds[type],
        transition: "bounce",
        hideProgressBar: false,
        showIcon: false,
        timeout: 5000
      }
    );
  }
};
