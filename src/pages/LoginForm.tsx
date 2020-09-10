import React, { useState, FormEvent } from 'react'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/core'

import { login } from '../utils/api'

import ErrorMessage from '../components/ErrorMessage'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    try {
      await login({ email, password })
      setIsLoading(false)
      setIsLoggedIn(true)
      setShowPassword(false)
    } catch (error) {
      setError('Invalid username or password')
      setIsLoading(false)
      setEmail('')
      setPassword('')
      setShowPassword(false)
    }
  }

  return (
    <Flex width="full" align="center" justify="center">
      <Box
        padding={8}
        maxW="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {isLoggedIn ? (
          <Box textAlign="center">
            <Text>{email} logged in!</Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsLoggedIn(false)}
            >
              Sign In
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="email@email.com"
                    size="lg"
                    onChange={(event: FormEvent<HTMLInputElement>) =>
                      setEmail(event.currentTarget.value)
                    }
                  />
                </FormControl>
                <FormControl mt={6} isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="******"
                      size="lg"
                      onChange={(event: FormEvent<HTMLInputElement>) => {
                        setPassword(event.currentTarget.value)
                      }}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <Icon name="view-off" />
                        ) : (
                          <Icon name="view" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  width="full"
                  mt={4}
                  type="submit"
                  variantColor="teal"
                  variant="outline"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
    </Flex>
  )
}
