import {serve} from "./deps.ts";
import Router from "./router.ts";

class App {
  port = parseInt(Deno.env.get("PORT") ?? "8000");
  routers: Router[] = [];

  constructor(options?: {port?: number}) {
    this.port = options?.port || this.port;
  }

  use(middleware: Router) {
    switch (middleware.type) {
      case "router":
        this.routers.push(middleware);
        break;
      default:
        throw new Error("Invalid middleware");
    }
  }

  async start() {
    console.log(`Server running on port ${this.port}`);
    return await serve((req) => {
      for (const router of this.routers) {
        const resp = router.handle(req);
        if (resp) {
          return resp;
        }
      }

      return new Response("Not Found", {
        status: 404,
      });
    }, {port: this.port});
  }
}

export default App;
