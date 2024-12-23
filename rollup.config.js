import path from 'path';
import { readFileSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

const packageJson = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

const commonPlugins = [
  resolve(),
  commonjs(),
  json(),
];

// CJS Configuration
const cjsConfig = {
  input: 'src/index.ts', // Your entry point
  output: {
    file: packageJson.main, // CommonJS output
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    ...commonPlugins,
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/cjs',  // Declaration files for CJS
      sourceMap: true,
      emitDeclarationOnly: true,
    }),
  ],
  external: ['react', 'react-dom'],
};

// ESM Configuration
const esmConfig = {
  input: 'src/index.ts', // Your entry point
  output: {
    file: packageJson.module, // ESM output
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    ...commonPlugins,
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/esm',  // Declaration files for ESM
      sourceMap: true,
      emitDeclarationOnly: true,
    }),
  ],
  external: ['react', 'react-dom'],
};

export default [cjsConfig, esmConfig];
