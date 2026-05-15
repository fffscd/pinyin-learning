const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const dataDir = path.join(root, ".tmp");
const progressPath = path.join(dataDir, "progress.json");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".m4a": "audio/mp4",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".webm": "audio/webm",
};

function emptyProgress() {
  return {
    completedRounds: 0,
    muted: false,
    letters: {},
    tones: {},
    courseStartDate: "",
    courses: {},
    dailyStats: {},
  };
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(`${JSON.stringify(data, null, 2)}\n`);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function readProgress() {
  try {
    return JSON.parse(fs.readFileSync(progressPath, "utf8"));
  } catch {
    return emptyProgress();
  }
}

function writeProgress(data) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(progressPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  if (relativePath.startsWith(".tmp/") || relativePath === ".tmp") return "";
  const filePath = path.normalize(path.join(root, relativePath));
  return filePath.startsWith(root) ? filePath : "";
}

async function handleProgress(request, response) {
  if (request.method === "GET") {
    sendJson(response, 200, readProgress());
    return;
  }

  if (request.method === "PUT") {
    try {
      const body = await readBody(request);
      const data = body ? JSON.parse(body) : emptyProgress();
      writeProgress(data);
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { ok: false, error: "invalid progress payload" });
    }
    return;
  }

  if (request.method === "DELETE") {
    try {
      fs.rmSync(progressPath, { force: true });
    } catch {
      // 删除失败时保持幂等响应。
    }
    sendJson(response, 200, { ok: true });
    return;
  }

  sendJson(response, 405, { ok: false, error: "method not allowed" });
}

function handleStatic(request, response) {
  const filePath = safeStaticPath(request.url);
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  if (request.url.startsWith("/api/progress")) {
    handleProgress(request, response);
    return;
  }

  handleStatic(request, response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`拼音小火车已启动：http://127.0.0.1:${port}`);
  console.log(`学习记录临时保存到：${progressPath}`);
});
