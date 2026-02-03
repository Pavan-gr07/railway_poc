import { createServer } from "./index";

const app = createServer();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 POC Backend running on port ${port}`);
  console.log(`🔧 API Base URL: http://localhost:${port}/api`);
});