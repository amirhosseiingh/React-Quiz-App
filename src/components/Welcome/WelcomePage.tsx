import { Box, Button, Heading, Text, VStack, Container } from "@chakra-ui/react";
import { Link } from "react-router"; 
const WelcomePage = () => {
  return (
    <Box
      height="100vh" 
      bgGradient="linear(to-r, purple.500, pink.500)" 
    >
      <Container
        maxW="container.md"
        centerContent
        height="100%" 
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          spacing={6}
          textAlign="center"
          p={8}
          boxShadow="lg"
          borderRadius="lg"
          bg="rgba(255, 255, 255, 0.2)" 
          color="white"
        >
          <Heading as="h1" size="2xl" fontWeight="bold">
            Welcome to Quiz App
          </Heading>
          <Text fontSize="lg" maxW="sm">
            Test your knowledge with our questions. 
            <br></br>
            Get started now and challenge yourself!
          </Text>
          <Link to="/setup">
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              variant="solid"
              _hover={{ bg: "white", color: "purple.500" }} 
            >
              Get Started
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

export default WelcomePage;
