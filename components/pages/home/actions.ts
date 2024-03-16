"use server";
import Analytics, { apiObject } from "@rudderstack/rudder-sdk-node";

const analytics = new Analytics(
  process.env.RUDDERSTACK_NODEJS_WRITE_KEY as string
);

export async function trackOnSelectPlan({
  anonymousId,
  properties,
}: {
  anonymousId: string;
  properties?: apiObject;
}) {
  analytics.track({
    event: "Plan Selected",
    anonymousId,
    properties,
  });
}

export async function trackOnStepChange({
  anonymousId,
  properties,
}: {
  anonymousId: string;
  properties?: apiObject;
}) {
  analytics.track({
    event: "Plans Step Submitted",
    anonymousId,
    properties,
  });
}
