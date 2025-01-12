const urlParams = new URLSearchParams(window.location.search);

async function setupWakelock() {
  if ("wakelock" in navigator) {
    let wakeLock = null;

    try {
      wakeLock = await navigator.wakeLock.request("screen");

      document.addEventListener("visibilitychange", async () => {
        if (wakeLock !== null && document.visibilityState === "visible") {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      });
    } catch (err) {
      console.log("Failed to acquire wake lock, ignoring");
    }
  }
}

if (urlParams.get('stayon')) {
  setupWakelock();
}
