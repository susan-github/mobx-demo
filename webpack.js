const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

// 入口分析
function entryParse(entry) {
  const content = fs.readFileSync(entry, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const body = ast.program.body
  // console.log(ast.program.body)
  const dependences = {}
  const dirname = path.dirname(entry)
  // console.log(dirname)
  traverse(ast, {
    ImportDeclaration({ node }) {
      const fullPath = `./${path.join(dirname, node.source.value)}`
      dependences[node.source.value] = fullPath
    }
  })
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  // console.log(code)
  return {
    entry,
    dependences,
    code
  }
}

// 依赖分析
function dependenceParce(entry) {
  const entryResult = entryParse(entry)
  const arr = [entryResult]
  for(let i = 0; i < arr.length; i++) {
    const { dependences } = arr[i]
    if(dependences) {
      for (let j in dependences) {
        // 修改数组元素，实现伪递归
        arr.push(entryParse(dependences[j]))
      }
    }

  }
  // console.log(arr)
  // 数据格式化，把entry作为key值
  const result = {}
  arr.forEach(item => {
    const { entry: itemEntry, dependences, code } = item
    result[itemEntry] = { dependences, code }
  })

  // console.log(result)
  return result
}

function generatorCode(entry) {
  const data =  JSON.stringify(dependenceParce(entry))

  return `(function(data){
    function require(module){
      function localRequire(relativePath) {
        return require(data[module].dependences[relativePath])
      }
      var exports = {};
      (function(require, exports, code){
        eval(code)
      })(localRequire, exports, data[module].code)
      return exports
    }
    require('${entry}')
  })(${data})`
  // return data
}

const result = generatorCode('./src/js/index.js')
console.log(result)