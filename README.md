# NestJS Security

## Goals:

> Learning to implement **security features to an API**

> ~~maybe more (front)~~

## Steps:

### Nest API

```sh
nest new <project-name>
```

- Change _default port_ IF necessary in `main.ts`
- Be sure to add sensitive info (.env, etc.) to `.gitignore`
- Install `Prisma ORM`

  - `npm install prisma -D`
  - `npm install @prisma/client`
  - `npx prisma init`
  - Do your thing (model, generate, migrate, etc.)
  - Create, in Nest, prisma resources

    <details><summary><strong>prisma.module.ts</strong></summary>

    ```ts
    import {Global, Module} from "@nestjs/common";
    import {PrismaService} from "./prisma.service";

    @Global()
    @Module({
    	providers: [PrismaService],
    	exports: [PrismaService],
    })
    export class PrismaModule {}
    ```

    </details>

    <details><summary><strong>prisma.service.ts</strong></summary>

    ```ts
    import {INestApplication, Injectable, OnModuleInit} from "@nestjs/common";
    import {PrismaClient} from "@prisma/client";

    @Injectable()
    export class PrismaService extends PrismaClient implements OnModuleInit {
    	async onModuleInit() {
    		await this.$connect();
    	}

    	async enableShutdownHooks(app: INestApplication) {
    		this.$on("beforeExit", async () => {
    			await app.close();
    		});
    	}
    }
    ```

    </details>

    <details><summary>import in <strong>app.module.ts</strong> if needed</summary>

    ```ts
    import {PrismaModule} from "./prisma/prisma.module";

    @Module({
      imports: [PrismaModule]
    })
    ```

     </details>

- Create your resources

  ```sh
  nest g resource <resource-name>
  ```

- Security: Passport
  - > Required packages
    ```sh
    npm install --save @nestjs/passport passport passport-local
    ```
    ```sh
    npm install --save-dev @types/passport-local
    ```
- Create **auth resource**
  - keep: module and service
    - fill as needed
  - create `auth/strategies/local.strategy.ts`
  - update `auth/auth.module.ts` to use Passport
- Implement bare-bones **/auth/login** route

  - update `app.controller.ts`
    ```ts
      @UseGuards(AuthGuard('local'))
      @Post('auth/login')
      async login(@Request() req) {
        return req.user;
      }
    ```
  - create **guard** class
    - `auth/guard/local-auth.guard.ts`
  - update `app.controller.ts`
    ```ts
      @UseGuards(LocalAuthGuard)
    ```

- UP NEXT <a href="https://docs.nestjs.com/security/authentication#jwt-functionality">JWT functionality</a>
- TO DO: complete readme

### ~~Front~~

- ~~soon™~~
  ```ts
  ...
  ```

---

sources:

- https://docs.nestjs.com/
  ...
