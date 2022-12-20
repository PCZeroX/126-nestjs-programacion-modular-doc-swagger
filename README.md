# 126 - NestJS Course - Modular Programming

**Curso de NestJS - Programación Modular**

```TS
npm install class-validator class-transformer @nestjs/mapped-types @nestjs/config @nestjs/axios @nestjs/swagger swagger-ui-express joi
```

Crear un token

```TS
node

require("crypto").randomBytes(64).toString("hex")
'54a942bf88d13b245500089f537bf2c50882fd0d16f7a2ff9407e5de977b12c67197048ecfd088c48bde40453eb3e404bfe1519003bccae73bf6b1e231bf800a'
```

- [126 - NestJS Course - Modular Programming](#126---nestjs-course---modular-programming)
  - [1.1 - Install the base proyect](#11---install-the-base-proyect)
  - [1.2 - Encapsular lógica en módulos](#12---encapsular-lógica-en-módulos)
  - [1.3 - Overview del proyecto PlatziStore](#13---overview-del-proyecto-platzistore)
  - [1.4 - Interacción entre módulos](#14---interacción-entre-módulos)
  - [1.5 - Entendiendo la inyección de dependencias](#15---entendiendo-la-inyección-de-dependencias)
  - [1.6 - useValue y useClass](#16---usevalue-y-useclass)
  - [1.7 - useFactory](#17---usefactory)
  - [1.8 - Global Module](#18---global-module)
  - [2.1 - Módulo de configuración](#21---módulo-de-configuración)
  - [2.2 - Configuración por ambientes](#22---configuración-por-ambientes)
  - [2.3 - Tipado en config](#23---tipado-en-config)
  - [2.4 - Validación de esquemas en variables de ambiente con Joi](#24---validación-de-esquemas-en-variables-de-ambiente-con-joi)
  - [3.1 - Integrando Swagger y PartialType con Open API](#31---integrando-swagger-y-partialtype-con-open-api)
  - [3.2 - Extendiendo la documentación](#32---extendiendo-la-documentación)
  - [4.1 - Configuración de Heroku](#41---configuración-de-heroku)
  - [4.2 - Deploy de NestJS en Heroku](#42---deploy-de-nestjs-en-heroku)

## 1.1 - Install the base proyect

**Instalación del proyecto base**

```TS
git remote -v
```

```TS
git remote rm origin
```

```TS
git remote add https://github.com/PCZeroX/nestjs-modular.git
```

```TS
NODE_ENV=dev npm run start:dev
```

**Resumen rápido de instalación previa del proyecto**

## 1.2 - Encapsular lógica en módulos

![](img/img-1.2-1.png)

<https://docs.nestjs.com/cli/usages>

```TS
nest generate module modules/users

// OR

nest g mo modules/users
```

```TS
nest generate module modules/products

// OR

nest g mo modules/products
```

Crear controladores del módulo de productos

```TS
nest g co modules/products/controllers/products --flat --no-spec
```

Crear servicios del módulo de productos

```TS
nest g s modules/products/services/products --flat --no-spec
```

Crear controlador categories

```TS
nest g co modules/products/controllers/categories --flat --no-spec
```

Crear controlador brands

```TS
nest g co modules/products/controllers/brands --flat --no-spec
```

## 1.3 - Overview del proyecto PlatziStore

```TS
nest g s modules/users/services/customers --flat --no-spec
nest g s modules/users/services/users --flat --no-spec
```

```TS
nest g co modules/users/controllers/customers --flat --no-spec
nest g co modules/users/controllers/users --flat --no-spec
```

## 1.4 - Interacción entre módulos

`products.module.ts`

```TS
@Module({
  exports: [ProductsService],
})
```

`users.module.ts`

```TS
@Module({
   imports: [ProductsModule],
})
```

## 1.5 - Entendiendo la inyección de dependencias

Usamos el patrón singleton

```JS

```

Tener cuidado con el error de referencia circular

## 1.6 - useValue y useClass

**useValue**

Provee una clase manejada por el patrón singleton o simplemente un valor

```JS
NODE_ENV=prod yarn start:dev
```

> <http://localhost:4000>

Lo vas a usar mucho en testing y lo vas a usar para conexiones

## 1.7 - useFactory

Podemos fabricar un provider de forma asíncrona y recibe una inyección. Son 2 atributos claves del useFactory

- Es asíncrono
- Recibe inyección en el mismo

> <https://docs.nestjs.com/techniques/http-module>

> https://www.youtube.com/watch?v=3aeK5SfWBSU&ab_channel=TariqSaeed

```TS
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [],
  controllers: [],
  providers: {
    provide: 'TASKS',
    useFactory: async (http: HttpService) => {
      const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
      const tasks = await firstValueFrom(http.get(todosUrl, {
          headers: {
            'Accept-Encoding': '',
            'Accept-Encoding': 'gzip,deflate,compress',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      ));

      console.log('tasks:', tasks);

      return tasks.data;
    },
    inject: [HttpService],
  }
})
```

Puede presentar un siguiente error

```TS
Axios Error: Unexpected End Of File {JavaScript Error}
```

Solo tiene que agregar `'Accept-Encoding': ''` en su encabezado a la hora de solicitar un llamado a la api de jsonplaceholder

- https://www.youtube.com/watch?v=AJE6N_dA0lY&ab_channel=Jayantkhandelwal

> Más detalles: https://stackoverflow.com/questions/74713476/getting-unexpected-end-of-file-axios-error-while-making-a-get-request-in-this

Este tasks de `console.log('tasks:', tasks)`

```JS
tasks: {
  status: 200,
  statusText: 'OK',
  headers: AxiosHeaders {
    date: 'Mon, 19 Dec 2022 01:07:25 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'close',
    'x-powered-by': 'Express',
    'x-ratelimit-limit': '1000',
    'x-ratelimit-remaining': '999',
    'x-ratelimit-reset': '1664801464',
    vary: 'Origin, Accept-Encoding',
    'access-control-allow-credentials': 'true',
    'cache-control': 'max-age=43200',
    pragma: 'no-cache',
    expires: '-1',
    'x-content-type-options': 'nosniff',
    etag: 'W/"5ef7-4Ad6/n39KWY9q6Ykm/ULNQ2F5IM"',
    via: '1.1 vegur',
    'cf-cache-status': 'HIT',
    age: '8832',
    'server-timing': 'cf-q-config;dur=6.9999950937927e-06',
    'report-to': '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v3?s=hUdo4qRjYbk5OGEck1a%2FUZ35fjxvGdreFJqIITZoo5Nho5a7j%2BUCTMN7GdVJJgHr2W77F%2FlHjZUzHpbHiBdE%2B%2F7rVrfcUb%2BeYf%2BvBPWG%2BzcJBDaczYHrsvfitNP8QwEO%2BZRWWE7o%2FGYiUy4rGiY3"}],"group":"cf-nel","max_age":604800}',
    nel: '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
    server: 'cloudflare',
    'cf-ray': '77bc3dc57d4c6dad-MIA',
    'alt-svc': 'h3=":443"; ma=86400, h3-29=":443"; ma=86400',
    [Symbol(defaults)]: null
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: [Function], Blob: [class Blob] },
    validateStatus: [Function: validateStatus],
    headers: AxiosHeaders {
      'User-Agent': 'axios/1.1.3',
      'Accept-Encoding': 'gzip, deflate, br',
      [Symbol(defaults)]: [Object]
    },
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: undefined
  },
  request: <ref *1> ClientRequest {
    _events: [Object: null prototype] {
      abort: [Function (anonymous)],
      aborted: [Function (anonymous)],
      connect: [Function (anonymous)],
      error: [Function (anonymous)],
      socket: [Function (anonymous)],
      timeout: [Function (anonymous)],
      finish: [Function: requestOnFinish]
    },
    _eventsCount: 7,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: true,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    maxRequestsOnConnectionReached: false,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: false,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    strictContentLength: false,
    _contentLength: 0,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    _closed: true,
    socket: TLSSocket {
      _tlsOptions: [Object],
      _secureEstablished: true,
      _securePending: false,
      _newSessionPending: false,
      _controlReleased: true,
      secureConnecting: false,
      _SNICallback: null,
      servername: 'jsonplaceholder.typicode.com',
      alpnProtocol: false,
      authorized: true,
      authorizationError: null,
      encrypted: true,
      _events: [Object: null prototype],
      _eventsCount: 9,
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'jsonplaceholder.typicode.com',
      _closeAfterHandlingError: false,
      _readableState: [ReadableState],
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: undefined,
      _server: null,
      ssl: null,
      _requestCert: true,
      _rejectUnauthorized: true,
      parser: null,
      _httpMessage: [Circular *1],
      [Symbol(res)]: null,
      [Symbol(verified)]: true,
      [Symbol(pendingSession)]: null,
      [Symbol(async_id_symbol)]: 8,
      [Symbol(kHandle)]: null,
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kSetNoDelay)]: false,
      [Symbol(kSetKeepAlive)]: true,
      [Symbol(kSetKeepAliveInitialDelay)]: 60,
      [Symbol(kBytesRead)]: 5100,
      [Symbol(kBytesWritten)]: 182,
      [Symbol(connect-options)]: [Object]
    },
    _header: 'GET /todos HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'User-Agent: axios/1.1.3\r\n' +
      'Accept-Encoding: gzip, deflate, br\r\n' +
      'Host: jsonplaceholder.typicode.com\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: nop],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 443,
      protocol: 'https:',
      options: [Object: null prototype],
      requests: [Object: null prototype] {},
      sockets: [Object: null prototype] {},
      freeSockets: [Object: null prototype] {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 0,
      maxCachedSessions: 100,
      _sessionCache: [Object],
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'GET',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/todos',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 4,
      _maxListeners: undefined,
      socket: [TLSSocket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      rawHeaders: [Array],
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [TLSSocket],
      _consuming: true,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'https://jsonplaceholder.typicode.com/todos',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(kHeaders)]: [Object],
      [Symbol(kHeadersCount)]: 50,
      [Symbol(kTrailers)]: null,
      [Symbol(kTrailersCount)]: 0
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'jsonplaceholder.typicode.com',
    protocol: 'https:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 0,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'https://jsonplaceholder.typicode.com/todos',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kBytesWritten)]: 0,
    [Symbol(kEndCalled)]: true,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'user-agent': [Array],
      'accept-encoding': [Array],
      host: [Array]
    },
    [Symbol(kUniqueHeaders)]: null
  },
  data: [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false
    },
    { userId: 1, id: 4, title: 'et porro tempora', completed: true },
    {
      userId: 1,
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false
    },
    {
      userId: 1,
      id: 6,
      title: 'qui ullam ratione quibusdam voluptatem quia omnis',
      completed: false
    },
    {
      userId: 1,
      id: 7,
      title: 'illo expedita consequatur quia in',
      completed: false
    },
    {
      userId: 1,
      id: 8,
      title: 'quo adipisci enim quam ut ab',
      completed: true
    },
    {
      userId: 1,
      id: 9,
      title: 'molestiae perspiciatis ipsa',
      completed: false
    },
    {
      userId: 1,
      id: 10,
      title: 'illo est ratione doloremque quia maiores aut',
      completed: true
    },
    {
      userId: 1,
      id: 11,
      title: 'vero rerum temporibus dolor',
      completed: true
    },
    {
      userId: 1,
      id: 12,
      title: 'ipsa repellendus fugit nisi',
      completed: true
    },
    {
      userId: 1,
      id: 13,
      title: 'et doloremque nulla',
      completed: false
    },
    {
      userId: 1,
      id: 14,
      title: 'repellendus sunt dolores architecto voluptatum',
      completed: true
    },
    {
      userId: 1,
      id: 15,
      title: 'ab voluptatum amet voluptas',
      completed: true
    },
    {
      userId: 1,
      id: 16,
      title: 'accusamus eos facilis sint et aut voluptatem',
      completed: true
    },
    {
      userId: 1,
      id: 17,
      title: 'quo laboriosam deleniti aut qui',
      completed: true
    },
    {
      userId: 1,
      id: 18,
      title: 'dolorum est consequatur ea mollitia in culpa',
      completed: false
    },
    {
      userId: 1,
      id: 19,
      title: 'molestiae ipsa aut voluptatibus pariatur dolor nihil',
      completed: true
    },
    {
      userId: 1,
      id: 20,
      title: 'ullam nobis libero sapiente ad optio sint',
      completed: true
    },
    {
      userId: 2,
      id: 21,
      title: 'suscipit repellat esse quibusdam voluptatem incidunt',
      completed: false
    },
    {
      userId: 2,
      id: 22,
      title: 'distinctio vitae autem nihil ut molestias quo',
      completed: true
    },
    {
      userId: 2,
      id: 23,
      title: 'et itaque necessitatibus maxime molestiae qui quas velit',
      completed: false
    },
    {
      userId: 2,
      id: 24,
      title: 'adipisci non ad dicta qui amet quaerat doloribus ea',
      completed: false
    },
    {
      userId: 2,
      id: 25,
      title: 'voluptas quo tenetur perspiciatis explicabo natus',
      completed: true
    },
    { userId: 2, id: 26, title: 'aliquam aut quasi', completed: true },
    {
      userId: 2,
      id: 27,
      title: 'veritatis pariatur delectus',
      completed: true
    },
    {
      userId: 2,
      id: 28,
      title: 'nesciunt totam sit blanditiis sit',
      completed: false
    },
    {
      userId: 2,
      id: 29,
      title: 'laborum aut in quam',
      completed: false
    },
    {
      userId: 2,
      id: 30,
      title: 'nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis',
      completed: true
    },
    {
      userId: 2,
      id: 31,
      title: 'repudiandae totam in est sint facere fuga',
      completed: false
    },
    {
      userId: 2,
      id: 32,
      title: 'earum doloribus ea doloremque quis',
      completed: false
    },
    { userId: 2, id: 33, title: 'sint sit aut vero', completed: false },
    {
      userId: 2,
      id: 34,
      title: 'porro aut necessitatibus eaque distinctio',
      completed: false
    },
    {
      userId: 2,
      id: 35,
      title: 'repellendus veritatis molestias dicta incidunt',
      completed: true
    },
    {
      userId: 2,
      id: 36,
      title: 'excepturi deleniti adipisci voluptatem et neque optio illum ad',
      completed: true
    },
    { userId: 2, id: 37, title: 'sunt cum tempora', completed: false },
    { userId: 2, id: 38, title: 'totam quia non', completed: false },
    {
      userId: 2,
      id: 39,
      title: 'doloremque quibusdam asperiores libero corrupti illum qui omnis',
      completed: false
    },
    {
      userId: 2,
      id: 40,
      title: 'totam atque quo nesciunt',
      completed: true
    },
    {
      userId: 3,
      id: 41,
      title: 'aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit',
      completed: false
    },
    {
      userId: 3,
      id: 42,
      title: 'rerum perferendis error quia ut eveniet',
      completed: false
    },
    {
      userId: 3,
      id: 43,
      title: 'tempore ut sint quis recusandae',
      completed: true
    },
    {
      userId: 3,
      id: 44,
      title: 'cum debitis quis accusamus doloremque ipsa natus sapiente omnis',
      completed: true
    },
    {
      userId: 3,
      id: 45,
      title: 'velit soluta adipisci molestias reiciendis harum',
      completed: false
    },
    {
      userId: 3,
      id: 46,
      title: 'vel voluptatem repellat nihil placeat corporis',
      completed: false
    },
    {
      userId: 3,
      id: 47,
      title: 'nam qui rerum fugiat accusamus',
      completed: false
    },
    {
      userId: 3,
      id: 48,
      title: 'sit reprehenderit omnis quia',
      completed: false
    },
    {
      userId: 3,
      id: 49,
      title: 'ut necessitatibus aut maiores debitis officia blanditiis velit et',
      completed: false
    },
    {
      userId: 3,
      id: 50,
      title: 'cupiditate necessitatibus ullam aut quis dolor voluptate',
      completed: true
    },
    {
      userId: 3,
      id: 51,
      title: 'distinctio exercitationem ab doloribus',
      completed: false
    },
    {
      userId: 3,
      id: 52,
      title: 'nesciunt dolorum quis recusandae ad pariatur ratione',
      completed: false
    },
    {
      userId: 3,
      id: 53,
      title: 'qui labore est occaecati recusandae aliquid quam',
      completed: false
    },
    {
      userId: 3,
      id: 54,
      title: 'quis et est ut voluptate quam dolor',
      completed: true
    },
    {
      userId: 3,
      id: 55,
      title: 'voluptatum omnis minima qui occaecati provident nulla voluptatem ratione',
      completed: true
    },
    {
      userId: 3,
      id: 56,
      title: 'deleniti ea temporibus enim',
      completed: true
    },
    {
      userId: 3,
      id: 57,
      title: 'pariatur et magnam ea doloribus similique voluptatem rerum quia',
      completed: false
    },
    {
      userId: 3,
      id: 58,
      title: 'est dicta totam qui explicabo doloribus qui dignissimos',
      completed: false
    },
    {
      userId: 3,
      id: 59,
      title: 'perspiciatis velit id laborum placeat iusto et aliquam odio',
      completed: false
    },
    {
      userId: 3,
      id: 60,
      title: 'et sequi qui architecto ut adipisci',
      completed: true
    },
    {
      userId: 4,
      id: 61,
      title: 'odit optio omnis qui sunt',
      completed: true
    },
    {
      userId: 4,
      id: 62,
      title: 'et placeat et tempore aspernatur sint numquam',
      completed: false
    },
    {
      userId: 4,
      id: 63,
      title: 'doloremque aut dolores quidem fuga qui nulla',
      completed: true
    },
    {
      userId: 4,
      id: 64,
      title: 'voluptas consequatur qui ut quia magnam nemo esse',
      completed: false
    },
    {
      userId: 4,
      id: 65,
      title: 'fugiat pariatur ratione ut asperiores necessitatibus magni',
      completed: false
    },
    {
      userId: 4,
      id: 66,
      title: 'rerum eum molestias autem voluptatum sit optio',
      completed: false
    },
    {
      userId: 4,
      id: 67,
      title: 'quia voluptatibus voluptatem quos similique maiores repellat',
      completed: false
    },
    {
      userId: 4,
      id: 68,
      title: 'aut id perspiciatis voluptatem iusto',
      completed: false
    },
    {
      userId: 4,
      id: 69,
      title: 'doloribus sint dolorum ab adipisci itaque dignissimos aliquam suscipit',
      completed: false
    },
    {
      userId: 4,
      id: 70,
      title: 'ut sequi accusantium et mollitia delectus sunt',
      completed: false
    },
    {
      userId: 4,
      id: 71,
      title: 'aut velit saepe ullam',
      completed: false
    },
    {
      userId: 4,
      id: 72,
      title: 'praesentium facilis facere quis harum voluptatibus voluptatem eum',
      completed: false
    },
    {
      userId: 4,
      id: 73,
      title: 'sint amet quia totam corporis qui exercitationem commodi',
      completed: true
    },
    {
      userId: 4,
      id: 74,
      title: 'expedita tempore nobis eveniet laborum maiores',
      completed: false
    },
    {
      userId: 4,
      id: 75,
      title: 'occaecati adipisci est possimus totam',
      completed: false
    },
    { userId: 4, id: 76, title: 'sequi dolorem sed', completed: true },
    {
      userId: 4,
      id: 77,
      title: 'maiores aut nesciunt delectus exercitationem vel assumenda eligendi at',
      completed: false
    },
    {
      userId: 4,
      id: 78,
      title: 'reiciendis est magnam amet nemo iste recusandae impedit quaerat',
      completed: false
    },
    { userId: 4, id: 79, title: 'eum ipsa maxime ut', completed: true },
    {
      userId: 4,
      id: 80,
      title: 'tempore molestias dolores rerum sequi voluptates ipsum consequatur',
      completed: true
    },
    { userId: 5, id: 81, title: 'suscipit qui totam', completed: true },
    {
      userId: 5,
      id: 82,
      title: 'voluptates eum voluptas et dicta',
      completed: false
    },
    {
      userId: 5,
      id: 83,
      title: 'quidem at rerum quis ex aut sit quam',
      completed: true
    },
    {
      userId: 5,
      id: 84,
      title: 'sunt veritatis ut voluptate',
      completed: false
    },
    { userId: 5, id: 85, title: 'et quia ad iste a', completed: true },
    {
      userId: 5,
      id: 86,
      title: 'incidunt ut saepe autem',
      completed: true
    },
    {
      userId: 5,
      id: 87,
      title: 'laudantium quae eligendi consequatur quia et vero autem',
      completed: true
    },
    {
      userId: 5,
      id: 88,
      title: 'vitae aut excepturi laboriosam sint aliquam et et accusantium',
      completed: false
    },
    { userId: 5, id: 89, title: 'sequi ut omnis et', completed: true },
    {
      userId: 5,
      id: 90,
      title: 'molestiae nisi accusantium tenetur dolorem et',
      completed: true
    },
    {
      userId: 5,
      id: 91,
      title: 'nulla quis consequatur saepe qui id expedita',
      completed: true
    },
    {
      userId: 5,
      id: 92,
      title: 'in omnis laboriosam',
      completed: true
    },
    {
      userId: 5,
      id: 93,
      title: 'odio iure consequatur molestiae quibusdam necessitatibus quia sint',
      completed: true
    },
    {
      userId: 5,
      id: 94,
      title: 'facilis modi saepe mollitia',
      completed: false
    },
    {
      userId: 5,
      id: 95,
      title: 'vel nihil et molestiae iusto assumenda nemo quo ut',
      completed: true
    },
    {
      userId: 5,
      id: 96,
      title: 'nobis suscipit ducimus enim asperiores voluptas',
      completed: false
    },
    {
      userId: 5,
      id: 97,
      title: 'dolorum laboriosam eos qui iure aliquam',
      completed: false
    },
    {
      userId: 5,
      id: 98,
      title: 'debitis accusantium ut quo facilis nihil quis sapiente necessitatibus',
      completed: true
    },
    {
      userId: 5,
      id: 99,
      title: 'neque voluptates ratione',
      completed: false
    },
    {
      userId: 5,
      id: 100,
      title: 'excepturi a et neque qui expedita vel voluptate',
      completed: false
    },
    ... 100 more items
  ]
}
```

Esto está en desuso. Actualmente aún se puede utilizar en la versión 7 de rxjs, pero dejará de estar en uso en la versión 8 de rxjs

```TS
@Module({
  imports: [],
  controllers: [],
  providers: {
    provide: 'TASKS',
    useFactory: async (http: HttpService) => {
      // ! @Deprecated
      const tasks = await http
        .get('https://jsonplaceholder.typicode.com/todos')
        .toPromise();

        return tasks.data;
    },
    inject: [HttpService],
  }
})
```

**OBSERVACIÓN**: Esto no es recomendable utilizarlo para un llamado de una API. Esto se hizo por cuestiones de aprendizaje y ver como es capaz de ejecutar un await dentro de useFactory

porque estarías dependiendo del inicio del servicio a una API externa. Se utiliza para conexiones a base de datos

- Se necesita establecer la conexión
- Se necesita esperar la conexión
- Que la aplicación arranque

El uso adecuado del `HttpModule` es cuando se utiliza en un método en específico y hace un request a otro servicio que sea necesario para la app

## 1.8 - Global Module

- `useClass`: es usado por defecto y usado por los servicios en nestjs
- `useValue`
- `useFactory`

El global module va a estar simplemente instanciado hacia a otros módulos

Se crea una instancia y la podemos inyectar sin la necesidad de importar ese módulo en el módulo que se esté necesitando

Estas 2 inyecciones `API_KEY` y `TASKS`

```TS
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
}
```

Solo tienen sentido dentro del dominio o scope de AppModulo para `app.services.ts` y `app.controller.ts`

`app.module.ts`

```TS
@Module({})

export class AppModule {}
```

**¿Qué pasa si queremos utilizarlo en otros módulos como users o products?**

Creamos el módulo database

```JS
nest g mo modules/database
```

Lo volvemos global y, a su vez, su provide `API_KEY` no necesita ser importado, ya que solo tiene que ser inyectado

`database.module.ts`

```TS
import { Global, Module } from '@nestjs/common';

const API_KEY = 'DEV 123';
const API_KEY_PROD = 'PROD 123';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
```

`app.service.ts`

```TS
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    console.log('this.tasks: 🌟', this.tasks);
    return `Hello World! ${this.apiKey}`;
  }
}
```

## 2.1 - Módulo de configuración

Tomar en cuenta que esto no es mantenible

```TS
import { Global, Module } from '@nestjs/common';

const API_KEY = 'DEV 123';
const API_KEY_PROD = 'PROD 123';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
```

Podemos tener variables de entorno para varias API KEYs, conexión a la base de datos, tipo de base de datos, el puerto y muchas cosas más

```TS
npm install @nestjs/config

// OR

yarn add @nestjs/config
```

`app.module.ts`

```TS
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: enviroments[process.env.NODE_ENV],
      envFilePath: `.env.development`,
      load: [configuration],
      isGlobal: true,
    })
  ]
})
```

`users.module.ts`

```TS
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const db = this.configService.get('DATABASE_NAME');
    const port = this.configService.get('PORT');

    console.log('apiKey:', apiKey);
    // apiKey: 54a942bf88d13b245500089f537bf2c50882fd0d16f7a2ff9407e5de977b12c67197048ecfd088c48bde40453eb3e404bfe1519003bccae73bf6b1e231bf800a

    console.log('db:', db);
    // db: my_db

    console.log('port:', port);
    // port: 4000

    return this.users;
  }
}
```

## 2.2 - Configuración por ambientes

Se crea en la raíz del proyectos estas variables de entorno `.env.development`, `.env.production` y `.env.staging`

`.env.development`

```TS
API_KEY=123
DATABASE_NAME=my_db
```

`.env.staging`

```TS
API_KEY=333
DATABASE_NAME=my_db_stag
```

`.env.production`

```TS
API_KEY=777
DATABASE_NAME=my_db_prod
```

`enviroments.ts`

```TS
export const enviroments = {
  dev: `.env.development`,
  stag: `.env.staging`,
  prod: `.env.production`,
}
```

`app.module.ts`

```TS
import { enviroments } from './enviroments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
  ]
})
```

`app.service.ts`

```TS
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private config: ConfigService,
  ) { }

  getHello(): string {
    const apiKey = this.config.get<string>('API_KEY');
    const name = this.config.get<string>('DATABASE_NAME');

    return `Hello World! 🦄
    - ${this.apiKey}
    - ${apiKey}
    - ${dbName}
    - ${dbPort}
    `;
  }
}
```

```TS
Hello World! 🦄
- this.apiKey: DEV 123
- apiKey:
54a942bf88d13b245500089f537bf2c50882fd0d16f7a2ff9407e5de977b12c67197048ecfd088c48bde40453eb3e404bfe1519003bccae73bf6b1e231bf800a
- dbName: my_db
- dbPort: 9876
```

```JS
NODE_ENV=dev npm run start:dev

// OR

NODE_ENV=dev yarn start:dev
```

## 2.3 - Tipado en config

`configuration.ts`

```TS
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
```

`app.module.ts`

```TS
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV],
      load: [configuration], // Cargar la configuración
      isGlobal: true,
    }),
  ]
})
```

`app.service.ts`

```TS
import {  ConfigType } from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject(configuration.KEY)
    private configService: ConfigType<typeof configuration>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.port;

    const db = this.configService.database;
    console.log('db:', db); // db: { name: 'my_db', port: '9876' }

    return `Hello World! 🦄
    - this.apiKey: ${this.apiKey}
    - apiKey: ${apiKey}
    - dbName: ${dbName}
    - dbPort: ${dbPort}
    `;
  }
}
```

## 2.4 - Validación de esquemas en variables de ambiente con Joi

```TS
npm install joi

// OR

yarn add joi
```

`app.module.ts`

```TS
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV],
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ]
})
```

## 3.1 - Integrando Swagger y PartialType con Open API

> - <https://spec.openapis.org/oas/v3.1.0>
> - <https://docs.nestjs.com/openapi/introduction>

<https://docs.nestjs.com/openapi/introduction#installation>

```JS
npm install --save @nestjs/swagger swagger-ui-express
```

<http://localhost:3000/docs/>

![](img/img-3.1-1.png)

<https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin>

`main.ts`

```JSON
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": ["@nestjs/swagger"]
  }
}
```

Paso extra `users/dtos/customer.dto.ts`

```TS
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
// import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }
```

Paso extra `users/dtos/user.dto.ts`

```TS
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
// import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
```

Prácticamente tienes que cambiarlo en todo los dtos

<http://localhost:3000/docs/>

Se procede a borrar el directorio `dist`

```JS
rm -rf dist/
```

Se vuelve a ingresar a esta dirección de enlace

<http://localhost:3000/docs/>

![](img/img-3.1-2.png)

## 3.2 - Extendiendo la documentación

`products.controller.ts`

```JS
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// ApiTags es para agrupar
@ApiTags('products')

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) { }

  @Get()
  // Dejar un resumen de este endpoint
  @ApiOperation({ summary: 'List of products 🦄' })
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string
  ) {
    return this.productsService.findAll()
  }
}
```

![](img/img-3.2-1.png)

## 4.1 - Configuración de Heroku

Debemos realizar una configuración de CORS.

CORS es una protección base y default el cual está en los servidores.

En este caso, estamos creando nuestro propio servidor en Node que recibe peticiones de cualquier cliente que puede ser una aplicación de Angular, React, Vue o Android.

Los CORS protegen que se pueda hacer peticiones de cualquier lado.

Suena raro que expongas tu API para que cualquiera me pueda hacer peticiones.

Normalmente, solo se puede hacer peticiones si estás en el mismo servidor, entonces viene configurado con esta protección por defecto.

Si quieres abrir tu API para que puedan solicitar peticiciones (request) de cualquier lado, debes auditar los CORS

```JS
async function bootstrap() {
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
```

Más detalles en el siguiente enlace: <https://docs.nestjs.com/security/cors#cors>

Detalles para hacer deploy en Heroku

<https://devcenter.heroku.com/articles/deploying-nodejs>

`package.json`

```JS
"engines": {
  "node": "14.x"
}
```

`Procfile`

- start es iniciar el proyecto en nest

```JS
web: npm run start

// OR

web: yarn start
```

- start:prod es para producción y es el que usaremos en el archivo `Procfile`

```JS
npm run start:prod

// OR

web: yarn start:prod
```

Usamos el CLI de Heroku

<https://devcenter.heroku.com/articles/heroku-cli>

```JS
heroku login
```

```JS
heroku create
```

`.env`

```JS
API_KEY=123
DATABASE_NAME=my_db
DATABASE_PORT=8091
PORT=3000
```

`.stag.env`

```JS
API_KEY=333
DATABASE_NAME=my_db_stag
DATABASE_PORT=8091
PORT=3000
```

`.prod.env`

```JS
API_KEY=777
DATABASE_NAME=my_db_prod
PORT=3000
```

`main.ts`

```JS
await app.listen(process.env.PORT || 3000);
```

Declaramos el siguiente comando en la terminal para ver si todo está funcionando a nivel local antes de mandar al servidor de Heroku

```JS
heroku local web
```

## 4.2 - Deploy de NestJS en Heroku

Nos pasamos a la rama master

```JS
git checkout master
```

Ahora que estamos en la rama master, nos traemos todo el código que está en la rama 14 para traer todo los cambios

```JS
git merge 14-step
```

```JS
git remote -v
```

```JS
git push heroku master
```

```JS
heroku logs --alll
```

Nos dirigimos a dashboard para ver los proyectos en nodejs.

Después vamos a configuraciones o settings y agregamos las variables de configuración o Config Vars.

Formateamos el código

```JS
yarn format
```

```JS
git push -u origin master
```

```JS
git push heroku master
```

```JS
https://serene-ocean-84224.herokuapp.com/docs/
```

---
