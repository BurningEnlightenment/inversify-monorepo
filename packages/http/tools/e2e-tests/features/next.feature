Feature: next decorator

The next decorator allows continue request

  Background: Having a container
    Given a container

    Rule: next decorator allows continue request
      Scenario: HTTP request is correctly continued with next decorator

        Given a warrior controller with next decorator for <method> method for <server_kind> server
        And a <server_kind> server from container
        And a <method> warriors HTTP request
        When the request is send
        Then the response status code is Ok-ish

        Examples:
          | server_kind | method    |
          | "express"   | "DELETE"  |
          | "express"   | "GET"     |
          | "express"   | "OPTIONS" |
          | "express"   | "PATCH"   |
          | "express"   | "POST"    |
          | "express"   | "PUT"     |
          | "express4"  | "DELETE"  |
          | "express4"  | "GET"     |
          | "express4"  | "OPTIONS" |
          | "express4"  | "PATCH"   |
          | "express4"  | "POST"    |
          | "express4"  | "PUT"     |
          | "fastify"   | "DELETE"  |
          | "fastify"   | "GET"     |
          | "fastify"   | "OPTIONS" |
          | "fastify"   | "PATCH"   |
          | "fastify"   | "POST"    |
          | "fastify"   | "PUT"     |
          | "hono"      | "DELETE"  |
          | "hono"      | "GET"     |
          | "hono"      | "OPTIONS" |
          | "hono"      | "PATCH"   |
          | "hono"      | "POST"    |
          | "hono"      | "PUT"     |