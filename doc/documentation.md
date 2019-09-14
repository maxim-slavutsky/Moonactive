# Class

## `Base`

### `constructor()`

### `logger: *`

## `EndPointBase`

### `validateSchema()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `formatValidationErrors()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `createMethod()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `getErrorResponse()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `ModelBase`

### `toJson()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `Api`

### `constructor()`

### `port: *`

### `webApp: *`

### `initialized: *`

### `start()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `loadMethods()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `addApiEndpoint()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `Event`

### `constructor()`

### `add: *`

### `remove: *`

### `add_Implementation()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `remove_Implementation()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `Main`

Main class for Moonactive test assignment. Creates API and Scheduler objects.

### `constructor()`

### `api: *`

### `scheduler: *`

## `Logger`

### `warn()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `error()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `log()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `RedisConnector`

### `constructor()`

Constructor method

### `options: *`

### `isConnected: *`

### `reconnectAttempts: *`

### `redis: *`

### `client: *`

### `addCommands()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `connect()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `onError(err: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| err | * |  |

### `addToQueue(streamName: string, id: string, params: Array, callback: Function)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| streamName | string |  |
| id | string |  |
| params | Array |  |
| callback | Function |  |

### `readFromQueue()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `Event`

### `constructor()`

### `timestamp: *`

### `message: *`

### `id: *`

### `stream()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `extractFromStream()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `toString()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `execute()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `schedule()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `Scheduler`

### `constructor()`

### `consumerId: *`

### `start()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `createGroup()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `recover()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `readStream()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `processMessages()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `acknowledgeMessage()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

# Function

## `getNowFormatted()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

## `log()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |