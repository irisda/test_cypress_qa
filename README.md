# Cypress Test Suite

End-to-end and API test suite built with Cypress 15, TypeScript, and Page Object Model.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/irisda/test_cypress_qa.git
cd cypress_test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
REQRES_BASE_URL=https://reqres.in
REQRES_API_KEY=<your-reqres-api-key>
```

> `.env` is git-ignored and must never be committed.

---

## Project Structure

```
cypress_test/
├── cypress/
│   └── support/
│       ├── commands.ts       # Custom Cypress commands (getUsers)
│       ├── cypress.d.ts      # TypeScript type declarations for custom commands
│       └── e2e.js            # Support entry file (imports commands, grep, reporter)
├── pages/
│   ├── LoginPage.ts          # Page locators (username, password, login button) and actions (visit, login)
│   └── InventoryPage.ts      # Page locators (cart badge, add-to-cart button, items) and actions (addFirstProductToCart, getCartBadge)
├── tests/
│   ├── ui/
│   │   └── addToCard.spec.ts # Task 1 & 2 — UI flow + network validation
│   └── api/
│       └── users.spec.ts     # Task 3 — API test
├── types/
│   └── userDetails.dto.ts    # TypeScript DTOs for reqres.in response
├── cypress.config.js         # Cypress configuration
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables (git-ignored)
└── .env.example              # Environment variable template
```

---

## Running Tests

### Run all tests (headless)

```bash
npx cypress run
```

### Run all tests (headed)

```bash
npx cypress run --headed
```

### Run all tests (interactive UI)

```bash
npx cypress open
```

### Run a specific spec file

```bash
# UI tests only
npx cypress run --spec "tests/ui/addToCard.spec.ts"

# API tests only
npx cypress run --spec "tests/api/users.spec.ts"
```

### Run tests by grep tag

```bash
npx cypress run --env grep="Task 1"
```

---

## Test Coverage

### Task 1 — UI Flow (`tests/ui/addToCard.spec.ts`)

| Test                                                         | Description                                                      |
| ------------------------------------------------------------ | ---------------------------------------------------------------- |
| adds a product to the cart and verifies the badge count is 1 | Logs in, adds the first product to cart, asserts badge shows `1` |

### Task 2 — Network Validation (`tests/ui/addToCard.spec.ts`)

| Test                                                              | Description                                                                                    |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| intercepts page load request and validates product image response | Validates page load response (status, headers, body); validates product image via `cy.request` |

### Task 3 — API Test (`tests/api/users.spec.ts`)

| Test                                                         | Description                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| should return status 200 with a valid users array for page 2 | GET `/api/users?page=2` — validates status 200, data array, and required user fields |

---

## Reports

After each `cypress run`, an HTML report is generated at:

```
cypress/reports/index.html
```

Open it in any browser to view test results with embedded screenshots on failure.

Screenshots on failure are saved to `cypress/screenshots/`.
