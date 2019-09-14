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

Main API class that proves resolving and wrapping of various endpoints and methods. New endpoint can be implemented and placed in `endpoints` folder

### `constructor(port: Integer)`

### `port: *`

### `webApp: *`

### `initialized: *`

### `start()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `loadMethods(): Promise`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `addApiEndpoint(fileName: String)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| fileName | String |  |

## `Event`

Endpoint class that implements Events API with methods for managing avents.

### `constructor()`

### `add: *`

### `remove: *`

### `addMethodImplementation(data: Object)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| data | Object |  |

### `removeMethodImplementation(data: Object)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| data | Object |  |

## `Main`

Main class for Moonactive test assignment. Creates API and Scheduler objects.

### `constructor()`

### `api: *`

### `scheduler: *`

## `Logger`

Wrapper class for console.log with several styling enhancements

### `getNowFormatted(): string`

Get current date and time formatted with milliseconds accuracy

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `writeLog(msg: String, level: String)`

Print log to console implementation

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| msg | String |  |
| level | String |  |

### `warn(msg: String)`

Log message with WARNING level

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| msg | String |  |

### `error(msg: String)`

Log message with ERROR level

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| msg | String |  |

### `log(msg: String)`

Log message with INFO level

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| msg | String |  |

## `RedisConnector`

### `constructor()`

Constructor method

### `options: *`

### `isConnected: *`

### `reconnectAttempts: *`

### `redis: *`

### `client: *`

### `addCommands()`

Add new set of commands to Redis interface in order to enable Streams manipulations

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `connect()`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |

### `onError(err: Error)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| err | Error |  |

### `addToQueue(streamName: string, id: string, params: Array, callback: Function)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| streamName | string |  |
| id | string |  |
| params | Array |  |
| callback | Function |  |

### `readFromQueue(groupName: *, consumerId: *, count: *, streamName: *, messageId: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| groupName | * |  |
| consumerId | * |  |
| count | * |  |
| streamName | * |  |
| messageId | * |  |
| callback | * |  |

### `addGroup(streamName: *, consumerId: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| streamName | * |  |
| consumerId | * |  |
| callback | * |  |

### `acknowledgeMessage(streamName: *, groupName: *, msgId: *, callback: *)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| streamName | * |  |
| groupName | * |  |
| msgId | * |  |
| callback | * |  |

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

### `acknowledgeMessage(event: Object)`

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| event | Object |  |

# Function