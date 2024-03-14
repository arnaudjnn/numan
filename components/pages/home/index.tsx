"use client";
import { useState } from "react";
import { Logo } from "@/components/assets/logo";
import {
  Container,
  Grid,
  Flex,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Divider,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { getLinkedinData, getProfileData } from "./actions";

export default function HomePage() {
  const positionForm = useForm();
  const linkedinUrlForm = useForm();
  const [profileData, setProfileData] = useState<{
    function: string;
    buyerPersona: string;
  } | null>(null);

  async function onSubmit(values: { position?: string; linkedinUrl?: string }) {
    const { position, linkedinUrl } = values;

    if (linkedinUrl) {
      const linkedinData = await getLinkedinData(linkedinUrl);
      const position = linkedinData.person.headline;
      const profileData = await getProfileData(position);
      setProfileData(profileData);
      return;
    }

    if (position) {
      const profileData = await getProfileData(position);
      setProfileData(profileData);
    }
  }

  return (
    <Container as="section">
      <Box maxWidth="lg" mx="auto">
        <Flex justifyContent="center" mb="20">
          <Logo height="5rem" width="auto" />
        </Flex>
        <Grid gridGap="5">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Check by position</Tab>
              <Tab>Check by LinkedIn URL</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px="0">
                <form onSubmit={positionForm.handleSubmit(onSubmit)}>
                  <Grid gridGap="3">
                    <FormControl
                      isInvalid={!!positionForm.formState.errors.position}
                    >
                      <FormLabel htmlFor="position">Position</FormLabel>
                      <Input
                        id="position"
                        placeholder="Ex: CEO, E-Commerce Manager,..."
                        {...positionForm.register("position", {
                          required: "This is required",
                          minLength: {
                            value: 3,
                            message: "Minimum length should be 3",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {positionForm.formState.errors.position &&
                          (positionForm.formState.errors.position
                            .message as string)}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={positionForm.formState.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </TabPanel>
              <TabPanel px="0">
                <form onSubmit={linkedinUrlForm.handleSubmit(onSubmit)}>
                  <Grid gridGap="3">
                    <FormControl
                      isInvalid={!!linkedinUrlForm.formState.errors.linkedinUrl}
                    >
                      <FormLabel htmlFor="linkedinUrl">LinkedIn URL</FormLabel>
                      <Input
                        id="linkedinUrl"
                        placeholder="https://www.linkedin.com/in/arnaudjeannin/"
                        {...linkedinUrlForm.register("linkedinUrl", {
                          required: "This is required",
                        })}
                      />
                      <FormErrorMessage>
                        {linkedinUrlForm.formState.errors.linkedinUrl &&
                          (linkedinUrlForm.formState.errors.linkedinUrl
                            .message as string)}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={linkedinUrlForm.formState.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {profileData && (
            <Grid gridGap="5">
              {profileData.function && (
                <Grid
                  bg="rgb(255 234 219)"
                  borderRadius="2xl"
                  py="6"
                  px="5"
                  gridTemplateColumns="1fr auto"
                >
                  <Flex alignItems="center">
                    <Heading size="md">Function</Heading>
                  </Flex>
                  <Flex alignItems="center">
                    <Text>{profileData.function}</Text>
                  </Flex>
                </Grid>
              )}
              {profileData.buyerPersona && (
                <Grid
                  bg="rgb(255 234 219)"
                  borderRadius="2xl"
                  py="6"
                  px="5"
                  gridTemplateColumns="1fr auto"
                >
                  <Flex alignItems="center">
                    <Heading size="md">Buyer persona</Heading>
                  </Flex>
                  <Flex alignItems="center">
                    <Text>{profileData.buyerPersona}</Text>
                  </Flex>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
