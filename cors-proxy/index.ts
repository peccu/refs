import express, { Application } from 'express'
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'

const app: Application = express();

/**
 * Original: https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png
 * Redirect to manipulated image:
 */
app.get("/", (_req, res) => {
  res.redirect("/wikipedia/en/7/7d/Lenna_%28test_image%29.png");
});

app.use(
  "/wikipedia",
  createProxyMiddleware({
    target: "https://upload.wikimedia.org/wikipedia",
    changeOrigin: true,
    selfHandleResponse: true,
    logger: console,
    on: {

      proxyRes: responseInterceptor(async (responseBuffer, _proxyRes, _req, res) => {
        res.removeHeader('content-security-policy'); // Remove the Content Security Policy header
        return responseBuffer
      }),

    }
  })
);

app.use('/todos', createProxyMiddleware({
  target: 'http://jsonplaceholder.typicode.com/todos',
  changeOrigin: true,
}));

var httpbinProxy = createProxyMiddleware({
  target: 'https://httpbin.org',
  secure: false,
  changeOrigin: true             // for vhosted sites, changes host header to match to target's host
})

app.use('/get', httpbinProxy)

app.use(
  "/get2",
  createProxyMiddleware({
    target: "https://httpbin.org/get",
    changeOrigin: true,
    selfHandleResponse: true,
    logger: console,
    on: {

      proxyRes: responseInterceptor(async (responseBuffer, _proxyRes, _req, res) => {
        res.removeHeader('content-security-policy'); // Remove the Content Security Policy header
        return responseBuffer
      }),

    }
  })
);


app.listen(8080, () => {
  console.log("Manipulate Wikipedia images. Example:");
  console.log(
    "https://03rjl.sse.codesandbox.io/wikipedia/en/7/7d/Lenna_%28test_image%29.png"
  );
});
