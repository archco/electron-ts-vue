const path = require('path');
const { spawn } = require('child_process');
const electron = require('electron');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackHotMiddleware = require('webpack-hot-middleware');

const mainConfig = require('./webpack.main.config');
const rendererConfig = require('./webpack.renderer.config');

let electronProcess = null;
let manualRestart = false;
let hotMiddleware;

function startRenderer() {
  return new Promise((resolve, reject) => {
    rendererConfig.mode = 'development';
    const compiler = webpack(rendererConfig);
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500,
    });

    // reload when index.html has been changed
    compiler.hooks.compilation.tap('compilation', compilation => {
      compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb();
      });
    });

    compiler.hooks.done.tap('done', stats => {
      logStats('Renderer', stats);
    });

    // dev server
    const server = new WebpackDevServer(
      compiler,
      {
        contentBase: path.resolve(__dirname, '../'),
        quiet: true,
        before(app, context) {
          app.use(hotMiddleware);
          context.middleware.waitUntilValid(() => resolve());
        },
      },
    );

    server.listen(9080);
  });
}

function startMain() {
  return new Promise((resolve, reject) => {
    mainConfig.mode = 'development';
    const compiler = webpack(mainConfig);

    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, cb) => {
      console.log('Main compiling...');
      hotMiddleware.publish({ action: 'compiling' });
      cb();
    });

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      logStats('Main', stats);

      if (electronProcess && electronProcess.kill) {
        manualRestart = true;
        process.kill(electronProcess.pid);
        electronProcess = null;
        startElectron();

        setTimeout(() => {
          manualRestart = false;
        }, 5e3);
      }

      resolve();
    });
  });
}

function startElectron() {
  let args = [
    '--inspect=5858',
    path.join(__dirname, '../dist/main.js'),
  ];
  args = args.concat(process.argv.slice(2));

  electronProcess = spawn(electron, args);

  electronProcess.stdout.on('data', data => {
    process.stdout.write(data);
  });
  electronProcess.stderr.on('data', data => {
    process.stderr.write(data);
  });
  electronProcess.on('close', () => {
    if (!manualRestart) process.exit();
  });
}

function logStats(processName, stats) {
  console.log(processName);
  console.log(stats.toString({
    colors: true,
    chunks: false,
    modules: false,
    children: false,
  }));
}

(function () {
  Promise.all([startRenderer(), startMain()])
    .then(() => startElectron())
    .catch(err => console.error(err));
})();
