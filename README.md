# autograb-code-challenge

A quick code response to [PoC requirements](./PoCRequirements.md) provided by the customer.

## How to run tests

1. Get perequisites [node 18](https://nodejs.org/en/download), [pnpm](https://pnpm.io/installation)
2. Clone the repo to your machine `git clone https://github.com/jamesgeekemp/autograb-code-challenge.git`
3. Install dependencies `pnpm install`
4. Run tests `pnpm test`

## Design approach

- Strong-typed domain model implemented in Zod for runtime type checking
- Each use case implemented as a feature and tested at the business unit level
- For purpose of this PoC, all db interations abstracted in a 'store'
- As features grow, and with addition of real backend persistence, would expect to follow Clean Architecture approach

## Omissions / next steps

- Web server and routing
- Security layer
- Data persistence
- Role-based permissions
- Error handling needs improving
- Association between user and account records (not explicitly addressed in this PoC)
- Web and mobile clients
