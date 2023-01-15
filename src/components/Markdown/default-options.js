// doc: https://nhnent.github.io/tui.editor/api/latest/ToastUIEditor.html#ToastUIEditor
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'

import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'

// Step 1. Import prismjs
import Prism from 'prismjs'

// Step 2. Import language files of prismjs that you need
import 'prismjs/components/prism-clojure.js'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

export default {
  minHeight: '200px',
  height: '100%',
  previewStyle: 'vertical',
  useCommandShortcut: true, // 是否键盘快捷键
  usageStatistics: false, // 是否发送主机名到谷歌分析系统
  hideModeSwitch: false, // 是否隐藏模式开关标签栏
  plugins: [[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax],
  toolbarItems: [ // 工具栏项目
    ['heading',
      'bold',
      'italic',
      'strike',
      'hr',
      'quote',
      'ul',
      'ol',
      'task',
      'indent',
      'outdent',
      'table',
      'image',
      'link',
      'code',
      'codeblock',
      'scrollSync']
  ]
}
