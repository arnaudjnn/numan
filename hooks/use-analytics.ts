import { getCookie } from "cookies-next";

const base64ToBytes = (base64Str: string): Uint8Array => {
  const binString = atob(base64Str);
  const bytes = binString.split("").map((char) => char.charCodeAt(0));
  return new Uint8Array(bytes);
};

const fromBase64 = (value: string): string =>
  new TextDecoder().decode(base64ToBytes(value));

export function decodeAnonymousId(encodedAnonymousId: string) {
  if (encodedAnonymousId) {
    return fromBase64(encodedAnonymousId.replace("RS_ENC_v3_", "")).replaceAll(
      '"',
      ""
    );
  }
  return null;
}

export function useAnalytics() {
  const encodedAnonymousId = getCookie("rl_anonymous_id");
  const anonymousId = decodeAnonymousId(encodedAnonymousId || "");

  return {
    anonymousId,
  };
}
