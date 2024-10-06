export function isTouchDevice() {
  return navigator.maxTouchPoints > 0;
}

export function getDeviceType() {
  const userAgent = navigator.userAgent.toLocaleLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isAndroid = /android/.test(userAgent);

  return {
    isIOS,
    isAndroid,
  };
}
