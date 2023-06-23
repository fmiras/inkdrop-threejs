'use babel';
import { markdownRenderer } from 'inkdrop'
import CodeMirror from 'codemirror'
import ReactThreeJS from './remark-threejs'

const THREEJS_MODE_INFO = {
  name: 'threejs',
  mime: 'application/ecmascript',
  mode: 'javascript',
  ext: [],
  alias: ['3js', 'three']
}

module.exports = {
  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkPlugins.push(math)
      markdownRenderer.remarkCodeComponents.math = ReactThreeJS
      markdownRenderer.remarkCodeComponents.inline_math = ReactThreeJS
    }
    if (CodeMirror) {
      CodeMirror.modeInfo.push(THREEJS_MODE_INFO)
    }
  },

  deactivate() {
    if (markdownRenderer) {
      const { remarkPlugins, remarkCodeComponents } = markdownRenderer
      const i = remarkPlugins.indexOf(math)
      if (i >= 0) remarkPlugins.splice(i, 1)
      if (remarkCodeComponents.math === ReactMath)
        delete remarkCodeComponents.math
      if (remarkCodeComponents.inline_math === ReactMath)
        delete remarkCodeComponents.inline_math
    }
    if (CodeMirror) {
      const { modeInfo } = CodeMirror
      const i = modeInfo.indexOf(THREEJS_MODE_INFO)
      if (i >= 0) modeInfo.splice(i, 1)
    }
  }
}