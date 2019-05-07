/**
 * @description:
 * @param {HTMLDivElement}
 * @param {string}
 * @param {object}
 * @return:
 */
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

/**
 * virtual dom的结构
 * 
 * attrs
 * children
 * tag
 * 
 */

/**
 * @description: Trans virtual dom to the real dom
 * @param {object} vnode object
 * @param {HTMLDivElement} container object
 * @return: HTMLDivElement
 */
function render(vnode, container) {
  // 如果是文本的话则认为参数是一个文本节点
  debugger
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return container.appendChild(textNode)
  }
  debugger
  // 创建一个 vnode.tag节点
  const dom = document.createElement(vnode.tag)

  // 属性存在时，设置节点的属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      setAttribute(dom, key, value) // 设置属性
    })
  }

  vnode.children.forEach(child => render(child, dom)) // 递归渲染子节点

  return container.appendChild(dom) // 将渲染结果挂载到真正的DOM上
}

/**
 * @description:
 * @param {HTMLDivElement}
 * @param {string}
 * @param {string}
 * @return:
 */
function setAttribute(dom, name, value) {
  // 如果属性名是className，则改回class
  if (name === 'className') name = 'class'

  // 如果属性名是onXXX，则是一个事件监听方法
  if (/on\w+/.test(name)) {
    name = name.toLowerCase()
    dom[name] = value || ''
    // 如果属性名是style，则更新style对象
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      for (let name in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[name] =
          typeof value[name] === 'number' ? value[name] + 'px' : value[name]
      }
    }
    // 普通属性则直接更新属性
  } else {
    if (name in dom) {
      dom[name] = value || ''
    }
    if (value) {
      dom.setAttribute(name, value)
    } else {
      dom.removeAttribute(name)
    }
  }
}

// 将上文定义的createElement方法放到对象React中
const React = {
  createElement
}

const ReactDOM = {
  render: (vnode, container) => {
    console.log(11111)
    // container.innerHTML = ''
    return render(vnode, container)
  }
}

ReactDOM.render(
  <h1 style="color:red">Hello, world!</h1>,
  document.getElementById('root'))
