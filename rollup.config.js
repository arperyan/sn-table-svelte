import path from 'path';
import livereload from 'rollup-plugin-livereload';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from "rollup-plugin-replace"
import autoPreprocess from 'svelte-preprocess';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

const production = !process.env.ROLLUP_WATCH;

module.exports = [{
  input: path.resolve(__dirname, 'src', 'index'),
  output: {
    file: path.resolve(__dirname, 'dist', 'svelte-component.js'),
    name: 'mystuff',
    format: 'umd',
    exports: 'default',
    sourcemap: true,
    globals: {
      '@nebula.js/stardust': 'stardust',
    },
  },
  external: ['@nebula.js/stardust'],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      preprocess: autoPreprocess({
        postcss: true,
        scss: {
          includePaths: ['src', 'node_modules']
        },
      }),
    }),
    commonjs(),
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('dist'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}];
