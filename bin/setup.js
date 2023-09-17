#!/usr/bin/env node

import fs from 'fs';
import { removeUnselectedModules } from './helpers.js';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

// copy the modules file
if (!fs.existsSync(`./.modules.template`)) process.exit(0);

const modules = fs
  .readFileSync(`./.modules.template`)
  .toString('utf-8')
  .trim()
  .split('\n')
  .map(module => module.trim());

// run some cli function to get the module choises
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select modules',
      name: 'selectedModules',
      choices: modules.map(moduleName => ({ name: moduleName })),
    },
  ])
  .then(({ selectedModules }) => {
    removeUnselectedModules(`.`, modules, selectedModules);

    fs.rmSync(`./.modules.template`);
    execSync('npm run format');
  });
