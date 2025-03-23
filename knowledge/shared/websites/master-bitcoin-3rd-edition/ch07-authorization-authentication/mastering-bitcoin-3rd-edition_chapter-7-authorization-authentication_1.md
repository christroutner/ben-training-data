# Authorization and Authentication in Bitcoin

When you receive bitcoins, you must decide who has permission to spend them (authorization) and how full nodes will distinguish authorized spenders from others (authentication). Your authorization instructions and authentication proof will be verified by thousands of independent full nodes to validate transactions.

Bitcoin uses a programming language called Script for these functions. Script is a Forth-like stack-based language that enables flexible spending conditions beyond simple payments to Bitcoin addresses. This chapter explores Script's features and common usage patterns.