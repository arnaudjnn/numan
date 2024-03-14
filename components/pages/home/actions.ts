"use server";

export async function getLinkedinData(url: string) {
  const res = await fetch("https://api.apollo.io/v1/people/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({
      api_key: process.env.APOLLO_API_KEY,
      linkedin_url: url,
    }),
  });
  const data = await res.json();
  return data;
}

export async function getProfileData(position: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/enrich-profile?position=${position}`
  );
  const data = await res.json();
  return data;
}
