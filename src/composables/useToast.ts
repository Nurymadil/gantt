import { ref, watch } from 'vue';

const isShowToast = ref(false);
const toastMessage = ref('');

const toastQueue: any[] = [];

export default () => {
  function hideToast() {
    isShowToast.value = false;
    toastMessage.value = '';
  }

  function showToast(message: string) {
    if (isShowToast.value) {
      isShowToast.value = false;
      setTimeout(() => {
        showToast(message);
      }, 500);
      return;
    }
    toastMessage.value = message;
    isShowToast.value = true;
  }

  watch(
    () => isShowToast.value,
    val => {
      if (val) {
        toastQueue.push(
          setTimeout(() => {
            hideToast();
          }, 3000)
        );
      } else {
        toastQueue.forEach(clearTimeout);
        toastQueue.length = 0;
      }
    }
  );

  return {
    isShowToast,
    toastMessage,
    showToast,
    hideToast
  };
};
