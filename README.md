# shipstation-node

Unofficial ShipStation API Wrapper for Node.js

## Usage

```ts
import ShipStation from 'shipstation-node';

// Create instance
const shipstation = new ShipStation({
  credentials: {
    // For making V1 API calls
    v1: { apiKey, apiSecret },
    // For making V2 API calls
    v2: { apiKey }
  }
});

// Get all orders
const orders = await shipstation.v1.orders.list();

// Get all tags
const order = await shipstation.v2.tags.get();
```

You do not need to set both V1 and V2 credentials. You only need to set the credentials for the API calls you are making.

You can also create ShipStation mock API calls by using the `mock` parameter. This will make real API calls, but to the mock API URL that ShipStation provides. Note that this only available for the V2 API.

```ts
const shipstation = new ShipStation({
  credentials: { v2: { mock: true } }
});
```

You may also retry ShipStation API failures automatically by setting `retryConfig` with any options supported by [axios-retry](https://www.npmjs.com/package/axios-retry).

```ts
const shipstation = new ShipStation({
  // ...config
  retryConfig: { retries: 3 }
});
```

You may also modify the underlying [axios](https://www.npmjs.com/package/axios) configurations using `requestConfig`.

```ts
const shipstation = new ShipStation({
  // ...config
  requestConfig: { timeout: 3000 }
});
```
