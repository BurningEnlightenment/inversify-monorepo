Feature: error filter

Error filters allows to catch and process errors thrown during the request lifecycle

  Background: Having a container
    Given a container

  Rule: error filters allows to catch and process errors

    Scenario: error filter allows to continue request processing
      Given a warrior controller with ErrorFilter for <method> method
      And a <server_kind> server from container
      And a <method> warriors HTTP request
      When the request is send
      Then the response status code is NOT IMPLEMENTED

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
