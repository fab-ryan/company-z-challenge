const welcome = {
  "/api": {
    get: {
      tag: ["Welcome"],
      summary: "Welcome Page",
      description: "welcome page",
      operationId: "getHome",
      responses: {
        200: {
          description: "success",
        },
      },
    },
  },
};

export default welcome;
