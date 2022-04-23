# NestJS Security

## Goals:

> Learning to implement **security features to an API**

> ~~maybe more (front)~~

## Steps:

### Nest API

```bash
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

    - > <detail><summary>prisma.module.ts</summary>

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

    - > <detail><summary>prisma.service.ts</summary>

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

      </detail>

    - > import **PrismaModule** in **app.module.ts** if needed

  - Create your resources
    ```bash
    nest g resource <resource-name>
    ```

- ...

### ~~Front~~

- ~~soon™~~
  ````ts
  ...```
  ````

---

...
