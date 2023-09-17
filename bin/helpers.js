import fs from 'fs';
import path from 'path';

const startPattern1 = /^{\/\*[\*]{0,1} MODULE_SECTION_START:(([a-zA-Z]+),)*([a-zA-Z]+)+ \*\/}$/;
const startPattern2 = /^\/\/ MODULE_SECTION_START:(([a-zA-Z]+),)*([a-zA-Z]+)+$/;
const selectionPattern1 = /^{\/\*[\*]{0,1} MODULE_SECTION_START:([a-zA-Z,]+)+ \*\/}$/;
const selectionPattern2 = /^\/\/ MODULE_SECTION_START:([a-zA-Z,]+)+$/;
const endPattern1 = /^{\*[\*]{0,1} MODULE_SECTION_END \*}$/;
const endPattern2 = /^\/\/ MODULE_SECTION_END$/;

function deleteIfUnselectedModuleFile(filePath, supportedModules, selectedModules) {
  const content = fs.readFileSync(filePath);
  const codeLines = content.toString('utf-8').trim().split('\n');

  if (codeLines[0].trim().startsWith('// MODULE_FILE:')) {
    const requiredModules = codeLines[0]
      .trim()
      .slice(15)
      .split(',')
      .filter(moduleName => supportedModules.includes(moduleName));

    if (requiredModules.length === 0) return;
    if (!requiredModules.some(moduleName => selectedModules.includes(moduleName))) {
      // delete the file
      fs.rmSync(filePath);
    }
    return true;
  }
  return false;
}

function deleteUnselectedModuleCode(filePath, supportedModules, selectedModules) {
  // read the file for the markers
  const content = fs.readFileSync(filePath);
  const codeLines = content.toString('utf-8').trim().split('\n');
  const usefulLines = [];
  let state = 0;
  let pattern = 0;
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i].trim();

    let patternLine = false;
    (() => {
      if (state == 0) {
        let requiredModules = [];
        if (startPattern1.test(line)) {
          pattern = 1;
          const groups = line.match(selectionPattern1);
          requiredModules = groups[1]
            .split(',')
            .filter(moduleName => supportedModules.includes(moduleName));
        } else if (startPattern2.test(line)) {
          pattern = 2;
          const groups = line.match(selectionPattern2);
          requiredModules = groups[1]
            .split(',')
            .filter(moduleName => supportedModules.includes(moduleName));
        } else return;
        if (requiredModules.length === 0) return;

        patternLine = true;

        state = requiredModules.some(moduleName => selectedModules.includes(moduleName)) ? 1 : 2;
      } else {
        if (
          (pattern === 1 && endPattern1.test(line)) ||
          (pattern === 2 && endPattern2.test(line))
        ) {
          pattern = 0;
          state = 0;
          patternLine = true;
        }
      }
    })();

    if (state != 2 && !patternLine) {
      usefulLines.push(i);
    }
  }
  const newFileContent = usefulLines.map(i => codeLines[i]).join('\n');
  fs.writeFileSync(filePath, newFileContent);
}

function handleFile(filePath, supportedModules, selectedModules) {
  if (!['ts', 'js', 'jsx', 'tsx'].includes(filePath.split('.')[filePath.split('.').length - 1]))
    return;

  if (deleteIfUnselectedModuleFile(filePath, supportedModules, selectedModules)) return;

  deleteUnselectedModuleCode(filePath, supportedModules, selectedModules);
}

function handleDirectory(dirPath, supportedModules, selectedModules, ignoredFiles) {
  const pattern = /^.module-[a-zA-Z0-9_]+$/;
  const requiredModules = fs
    .readdirSync(dirPath)
    .filter(fileName => pattern.test(fileName))
    .map(fileName => fileName.slice(8))
    .filter(moduleName => supportedModules.includes(moduleName));
  if (requiredModules.length === 0) {
    removeUnselectedModules(dirPath, supportedModules, selectedModules, ignoredFiles);
    return;
  }
  if (!requiredModules.some(moduleName => selectedModules.includes(moduleName))) {
    // delete the directory
    console.log(dirPath);
    fs.rmSync(dirPath, { recursive: true });
  } else {
    // delete the .module files
    for (const requiredModule of requiredModules) {
      fs.rmSync(path.join(dirPath, `.module-${requiredModule}`));
    }
  }
}

export function removeUnselectedModules(
  basePath,
  supportedModules,
  selectedModules,
  ignoredFiles = [],
) {
  const dirContents = fs.readdirSync(basePath);
  if (dirContents.includes('.gitignore')) {
    for (const objName of fs
      .readFileSync(path.join(basePath, '.gitignore'))
      .toString('utf-8')
      .trim()
      .split('\n')
      .filter(name => Boolean(name))) {
      ignoredFiles.push(objName);
    }
  }
  for (const obj of dirContents) {
    if (ignoredFiles.includes(obj)) continue;
    const objPath = path.join(basePath, obj);
    if (fs.statSync(objPath).isDirectory()) {
      handleDirectory(objPath, supportedModules, selectedModules, ignoredFiles);
    } else {
      handleFile(objPath, supportedModules, selectedModules);
    }
  }
}
