import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default defineConfig({
    plugins:[vue()],
    server:{
        proxy:{
            '/api':'http://localhost:8080'
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@nm': path.resolve(__dirname, 'node_modules'),
            '~bs': path.resolve(__dirname,'node_modules/bootstrap'),
        }
    }
})