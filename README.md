# shipstation-node

[![npm version](https://img.shields.io/npm/v/shipstation-node.svg)](https://www.npmjs.com/package/shipstation-node)
[![Build Status](https://img.shields.io/github/actions/workflow/status/rip-technologies/shipstation-node/ci.yaml?branch=master)](https://github.com/rip-technologies/shipstation-node/actions)
[![License](https://img.shields.io/github/license/rip-technologies/shipstation-node.svg)](https://github.com/rip-technologies/shipstation-node/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/shipstation-node.svg)](https://www.npmjs.com/package/shipstation-node)

Unofficial ShipStation API wrapper for Node.js, providing a modern, type-safe interface to both the v1 and v2 ShipStation APIs.

---

## Features

- Full support for both ShipStation v1 and v2 APIs
- Complete TypeScript support and request validation with detailed type definitions
- Automatic rate limiting handling
- Mock API support for testing (only available for v2 API)
- Promise-based async/await interface
- Customizable request configurations with automatic retries

---

## Installation

### Package manager

Using npm:

```bash
$ npm install shipstation-node
```

Using pnpm:

```bash
$ pnpm add shipstation-node
```

Using bun:

```bash
$ bun add shipstation-node
```

---

## Usage

### Create a Client Instance

All requests should be made through an instantiated `ShipStation` class. You only need to set the credentials for the API version(s) you plan to use.

```ts
import ShipStation from 'shipstation-node';

// Create instance
const shipstation = new ShipStation({
  credentials: {
    // For making v1 API calls
    v1: { apiKey, apiSecret },
    // For making v2 API calls
    v2: { apiKey }
  }
});
```

### Making API Requests

You can make API requests to both v1 and v2 endpoints:

```ts
// v1 Example - List Tags (https://www.shipstation.com/docs/api/accounts/list-tags/)
const tags = await shipstation.v1.accounts.listTags();

// v2 Example: Get Tags (https://docs.shipstation.com/openapi/tags/list_tags)
const tagsV2 = await shipstation.v2.tags.get();

// Working with orders (https://www.shipstation.com/docs/api/orders/list-orders/)
const orders = await shipstation.v1.orders.list({
  pageSize: 100,
  orderStatus: 'awaiting_shipment'
});
```

### Mock API Support

Use the mock API for testing (v2 API only):

```ts
const shipstation = new ShipStation({
  credentials: { v2: { mock: true } }
});
```

---

## Advanced Configuration

### Retry Configuration

Configure automatic retry behavior for failed API calls using [axios-retry](https://www.npmjs.com/package/axios-retry):

```ts
const shipstation = new ShipStation({
  credentials: {
    /* ... */
  },
  retryConfig: {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) => {
      return axios.isRetryableError(error);
    }
  }
});
```

### Request Configuration

Customize the underlying [axios](https://www.npmjs.com/package/axios) request settings:

```ts
const shipstation = new ShipStation({
  credentials: {
    /* ... */
  },
  requestConfig: {
    timeout: 5000,
    headers: {
      'Custom-Header': 'value'
    }
  }
});
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Test your changes (`pnpm run build` and `pnpm run lint`)
5. Push to the branch (`git push origin feature-name`)
6. Open a pull request with a thorough description

---

## Links

- [v1 API Documentation](https://www.shipstation.com/docs/api/)
- [v2 API Documentation](https://docs.shipstation.com/getting-started)
- [Changelog](https://github.com/rip-technologies/shipstation-node/releases)
- [Issues](https://github.com/rip-technologies/shipstation-node/issues)
- [GitHub Repository](https://github.com/rip-technologies/shipstation-node)

---

## Support

If you encounter any issues, feel free to open an [issue](https://github.com/rip-technologies/shipstation-node/issues).

---

## License

This project is licensed under the [MIT License](https://github.com/rip-technologies/shipstation-node/blob/main/LICENSE).

---

## Author

Created and maintained by [Jake Leventhal](https://github.com/jakeleventhal).
