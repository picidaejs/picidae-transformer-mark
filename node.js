/**
 * @file: node
 * @author: Cuttle Cong
 * @date: 2018/2/13
 * @description: 
 */

function walk(node, cond, process, parent) {
  parent = parent || null

  if (!Array.isArray(node)) {
    node = [node]
  }

  node.forEach(function (node, i, all) {
    if (cond(node, i, parent)) {
      process(node, i, parent)
    }
    node.children && walk(node.children, cond, process, node)
  })
}

exports.remarkTransformer = function (options) {
  return function (node) {
    walk(node, function (node) {
      return node.type === 'text' && node.value.indexOf('==') !== -1
    }, function (node, index, parent) {
      var value = node.value

      var matched = false
      var firstM = false, endM = false
      var start = -1, values = value.split('')

      for (var i = 0; i < value.length; i++) {
        var char = value[i]
        var nextChar = value[i + 1]
        if (!firstM) {
          if (char === '=' && nextChar === '=') {
            start = i + 2
            firstM = true
            i++
          }
        }
        else {
          if (char === '=' && nextChar === '=') {
            // content is empty
            if (start === i) {
              start = -1
              firstM = false
              i++
            }
            else {
              firstM = false
              values[start - 1] = '<mark>'
              values[start - 2] = ''
              values[i] = '</mark>'
              values[i + 1] = ''
              matched = true

              start = -1
              i++
            }
          }
          else if (char === '\\' && nextChar === '=') {
            values[i] = ''
            i++
          }
        }
      }

      if (matched) {
        node.type = 'html'
        node.value = values.join('')
      }
    })
  }
}