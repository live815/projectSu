import FingerprintJS from "@fingerprintjs/fingerprintjs";
export function getDeviceId() {
  const fpPromise = FingerprintJS.load();
  return fpPromise.then((fg) => fg.get()).then((result) => result.visitorId);
}
