"use client";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  Container,
  Box,
  Text,
  Grid,
  Flex,
  Radio,
  Button,
  Tag,
} from "@chakra-ui/react";
import { useState } from "react";
import { trackOnSelectPlan, trackOnStepChange } from "./actions";

const priceFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function HomePage() {
  const { anonymousId } = useAnalytics();
  const [monthsFrequency, setMonthsFrequency] = useState(1);
  const plans = [
    {
      title: "Every Month",
      monthsFrequency: 1,
      price: 28,
      discount: 0,
    },
    {
      title: "Every 3 Months",
      monthsFrequency: 3,
      price: 19.67,
      discount: 30,
    },
    {
      title: "Every 6 Months",
      monthsFrequency: 6,
      price: 16.67,
      discount: 40,
    },
    {
      title: "Every Year",
      monthsFrequency: 12,
      price: 12.67,
      discount: 50,
    },
  ];
  const plan = plans.find((plan) => plan.monthsFrequency === monthsFrequency);

  return (
    <Container as="section">
      <Box maxWidth="lg" mx="auto">
        <Box textAlign="center" mb="5">
          <Text fontWeight="black" fontSize="2xl">
            Select your preferred shipping frequency
          </Text>
        </Box>
        <Grid gridGap="5" mb="8">
          {plans.map((plan, i) => (
            <Box
              key={i}
              as="button"
              onClick={() => {
                setMonthsFrequency(plan.monthsFrequency);
                if (anonymousId) {
                  trackOnSelectPlan({
                    anonymousId,
                    properties: {
                      plan,
                    },
                  });
                }
              }}
              bg={plan.monthsFrequency === monthsFrequency ? "black" : "white"}
              color={
                plan.monthsFrequency === monthsFrequency ? "white" : "black"
              }
              border="1px solid"
              borderColor="rgba(0,0,0,.16)"
              borderRadius="xl"
              p="4"
            >
              <Grid gridTemplateColumns="1fr auto auto" gridGap="5">
                <Box textAlign="left">
                  <Flex fontWeight="semibold">
                    <Text>{plan.title}</Text>
                    {plan.discount > 0 && (
                      <Text ml="1">{`(-${plan.discount}%)`}</Text>
                    )}
                  </Flex>
                  <Text fontSize="sm">
                    <Box as="span" fontWeight="bold" fontSize="md">
                      {priceFormat.format(plan.price)}
                    </Box>
                    / month
                  </Text>
                </Box>
                <Flex alignItems="center">
                  {plan.discount === 50 && (
                    <Tag bg="#01D88A" color="white">
                      Best value
                    </Tag>
                  )}
                </Flex>
                <Flex alignItems="center">
                  <Radio
                    isChecked={plan.monthsFrequency === monthsFrequency}
                    size="lg"
                  />
                </Flex>
              </Grid>
            </Box>
          ))}
        </Grid>
        <Grid
          borderTop="1px solid"
          borderColor="rgba(0,0,0,.16)"
          gridGap="2"
          mb="5"
          py="3"
          fontWeight="bold"
          fontSize="lg"
        >
          {plan && plan.discount > 0 && (
            <Flex justifyContent="space-between">
              <Text>Discount</Text>
              <Text>
                {priceFormat.format(
                  plans[0].price * plan.monthsFrequency -
                    plan.price * plan.monthsFrequency
                )}
              </Text>
            </Flex>
          )}
          <Flex justifyContent="space-between">
            <Text>Total</Text>
            <Text>
              {plan
                ? priceFormat.format(plan.price * plan.monthsFrequency)
                : "-"}
            </Text>
          </Flex>
        </Grid>
        <Button
          width="100%"
          size="lg"
          onClick={() => {
            if (anonymousId) {
              trackOnStepChange({
                anonymousId,
                properties: {
                  plan,
                },
              });
            }
          }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
