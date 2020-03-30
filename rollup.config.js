import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const dependencies = [
    ...Object.keys(pkg.dependencies || []),
    ...Object.keys(pkg.devDependencies || []),
];

const plugins = [
    babel({
        exclude: 'node_modules/**',
    }),
];

const builds = {
    // Native ES module, for use with new bundlers (Webpack 2+, Rollup)
    esm: {
        entry: 'src/cx.js',
        format: 'es',
        dest: `dist/cx.es.js`,
        external: dependencies,
        plugins: plugins,
    },
    // Browser via <script> tag, CJS, AMD
    umd: {
        entry: 'src/cx.js',
        format: 'umd',
        dest: `dist/cx.min.js`,
        plugins: [resolve(), commonjs(), terser(), ...plugins],
    },
};

function generateConfig(name) {
    const opts = builds[name];

    const config = {
        input: opts.entry,
        output: {
            file: opts.dest,
            format: opts.format,
            name: 'cx',
        },
        external: opts.external,
        plugins: opts.plugins || [],
    };

    return config;
}

export default Object.keys(builds).map(generateConfig);
